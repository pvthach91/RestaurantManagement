import {Component, OnInit} from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastrService} from "ngx-toastr";
import {SignUpInfo} from "../../../auth/signup-info";
import {User} from "../../../model/user.model";
import {AdminService} from "../../../services/admin.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends SimpleModalComponent<UserDialogModel, string> implements OnInit, UserDialogModel {

  isNewAction: boolean;
  form: any = {};
  signupInfo: SignUpInfo;
  user: User;

  constructor(private adminService: AdminService,
              private spinnerService: Ng4LoadingSpinnerService,
              private toastr: ToastrService) {
    super();
  }

  ngOnInit() {
    this.form.role = 'createHRUser';
  }

  apply() {
    this.result = 'refresh';
    this.close();
  }

  onSubmit() {
    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.phone,
      this.form.password);
    this.spinnerService.show();
    this.adminService.registerStaffUser(this.signupInfo, this.form.role).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.apply();
        } else {
          this.toastr.error(data.message, 'Failed');
        }

      },
      error => {
        console.log(error);
        this.spinnerService.hide();
        this.toastr.error('Failed to register', 'Failed');
      }
    );
  }
}

export interface UserDialogModel {
  isNewAction: boolean;
  user: User;
}
