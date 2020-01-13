import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../auth/token-storage.service";
import {ConfirmDialogComponent} from "../../util/confirm/confirm-dialog.component";
import {SimpleModalService} from "ngx-simple-modal";

@Component({
  selector: 'app-menu-info',
  templateUrl: './menu-info.component.html',
  styleUrls: ['./menu-info.component.css']
})
export class MenuInfoComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService,
              private SimpleModalService: SimpleModalService) { }

  ngOnInit() {
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.href = 'auth/login';
  }

  confirmLogout() {
    this.SimpleModalService.addModal(ConfirmDialogComponent, {
      title: 'Confirmation',
      message: 'Are you sure you want to log out?'})
      .subscribe((isConfirmed) => {
        if (isConfirmed != undefined && isConfirmed != null && isConfirmed == true) {
          this.logout();
        }
      });
  }

}
