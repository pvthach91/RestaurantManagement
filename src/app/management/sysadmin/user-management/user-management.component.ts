import {Component, OnInit} from '@angular/core';
import {configuration} from "../../../model/configuration.model";
import {SimpleModalService} from "ngx-simple-modal";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../model/user.model";
import {UserSearchCriteria} from "../../../model/user-search-criteria.model";
import {ConfirmDialogComponent} from "../../../util/confirm/confirm-dialog.component";
import {AdminService} from "../../../services/admin.service";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {Role} from "../../../model/role.model";
import {UserFormComponent} from "../user-form/user-form.component";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users:Array<User> = new Array<User>();
  criteria: UserSearchCriteria;

  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  form: any = {};

  constructor(private adminService: AdminService,
              private tokenStorage: TokenStorageService,
              private SimpleModalService: SimpleModalService,
              private spinnerService: Ng4LoadingSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit() {
    if (!this.tokenStorage.hasAdminRole()) {
      window.location.href = 'management/403';
    }
    this.currentPage = 0;
    this.form.role = 0;
    this.form.isActive = null;
    this.form.sort = 1;
    this.search(1);
  }


  onSubmit() {
    this.search(1);
  }

  showDialog(isNew: boolean, user: User) {
    this.SimpleModalService.addModal(UserFormComponent, {
      isNewAction: isNew,
      user: user})
      .subscribe((message) => {
        if (message != undefined && message != null && message == "refresh") {
          this.search(this.currentPage);
        }
      });
  }

  search(page: number) {
    this.criteria = new UserSearchCriteria(
      this.form.username,
      this.form.isActive,
      null,
      1,
      page,
      configuration.pageSize
    );
    this.spinnerService.show();
    this.adminService.getUsers(this.criteria).subscribe(
      data => {
        this.users = data.data;
        this.currentPage = data.current;
        this.totalPage = data.total;
        this.makePages();
        this.spinnerService.hide();
      },
      error => {
        console.log(error);
        alert(JSON.stringify(error));
        this.spinnerService.hide();
      }
    );
  }

  makePages() {
    this.pages = new Array<number>();
    if (this.totalPage < 1) {
      // do nothing
    } else {
      for (var i = 1; i <= this.totalPage; i++) {
        this.pages.push(i);
      }
    }
  }

  gotoPage(page: number) {
    if(page <1) {
      page = 1;
    }
    this.search(page);
  }

  activate(username: string, index: number) {
    this.SimpleModalService.addModal(ConfirmDialogComponent, {
      title: 'Confirmation',
      message: 'Are you sure to ACTIVATE the user?'})
      .subscribe((isConfirmed) => {
        // We get modal result
        if (!isConfirmed) {
          // Do nothing
        } else {
          this.spinnerService.show();
          this.adminService.activateUser(username).subscribe(
            data => {
              this.spinnerService.hide();
              if (data.success) {
                this.toastr.success('Activated user successfully', 'Activated user successfully');
                this.users[index] = data.data;
              } else {
                this.toastr.error(data.message, 'Failed');
              }
            },
            error => {
              this.spinnerService.hide();
              this.toastr.error('Failed to activate the user', 'Failed');
            }
          );
        }
      });
  }

  deactivate(username: string, index: number) {
    this.SimpleModalService.addModal(ConfirmDialogComponent, {
      title: 'Confirmation',
      message: 'Are you sure to DEACTIVATE the user?'})
      .subscribe((isConfirmed) => {
        // We get modal result
        if (!isConfirmed) {
          // Do nothing
        } else {
          this.spinnerService.show();
          this.adminService.deactivateUser(username).subscribe(
            data => {
              this.spinnerService.hide();
              if (data.success) {
                this.toastr.success('Deactivated user successfully', 'Deactivated user successfully');
                this.users[index] = data.data;
              } else {
                this.toastr.error(data.message, 'Failed');
              }
            },
            error => {
              this.spinnerService.hide();
              this.toastr.error('Failed to deactivate the user', 'Failed');
            }
          );
        }
      });
  }

  hasAdminRole(roles: Array<Role>): boolean {
    let result = false;
    roles.forEach(role => {
      if (role.name == 'ROLE_ADMIN') {
        result = true;
      }
    });
    return result;
  }

  hasHRRole(roles: Array<Role>): boolean {
    let result = false;
    roles.forEach(role => {
      if (role.name == 'ROLE_HR') {
        result = true;
      }
    });
    return result;
  }

  hasAccountingRole(roles: Array<Role>): boolean {
    let result = false;
    roles.forEach(role => {
      if (role.name == 'ROLE_ACCOUNTING') {
        result = true;
      }
    });
    return result;
  }

  hasStockRole(roles: Array<Role>): boolean {
    let result = false;
    roles.forEach(role => {
      if (role.name == 'ROLE_STOCK') {
        result = true;
      }
    });
    return result;
  }

  hasSaleRole(roles: Array<Role>): boolean {
    let result = false;
    roles.forEach(role => {
      if (role.name == 'ROLE_SALE') {
        result = true;
      }
    });
    return result;
  }

  hasBODRole(roles: Array<Role>): boolean {
    let result = false;
    roles.forEach(role => {
      if (role.name == 'ROLE_BOD') {
        result = true;
      }
    });
    return result;
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.href = 'auth/login';
  }

}
