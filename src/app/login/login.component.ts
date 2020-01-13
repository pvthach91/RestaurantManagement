import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import {ToastrService} from "ngx-toastr";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {SimpleModalService} from "ngx-simple-modal";
import {AlertDialogComponent} from "../util/alert/alert-dialog.component";
import {ChangePage} from "../model/change-page.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();
  form: any = {};
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private SimpleModalService: SimpleModalService,
              private spinnerService: Ng4LoadingSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit() {
    if (this.tokenStorage.isLoggedIn()) {
      let defaultPage = this.tokenStorage.getDefaultPage();
      window.location.href = defaultPage;
    }
  }

  onSubmit() {
    this.spinnerService.show();
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success == true) {
          this.tokenStorage.saveToken(data.data.accessToken);
          this.tokenStorage.saveUsername(data.data.username);
          this.tokenStorage.saveFullName(data.data.fullName);
          this.tokenStorage.saveAuthorities(data.data.authorities);
          this.reloadPage();
        } else {
          this.toastr.error(data.message, 'Login failed');
        }
      },
      error => {
        this.spinnerService.hide();
        this.toastr.error('Please check your username and password', 'Login failed');
      }
    );
  }

  reloadPage() {
    let defaultPage = this.tokenStorage.getDefaultPage();
    window.location.href = defaultPage;
  }
  goToHomePage() {
    let changePage: ChangePage = new ChangePage('home', null);
    this.currentPageEmit.emit(changePage);
  }
}
