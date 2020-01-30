import { Component, OnInit } from '@angular/core';
import {Employee} from "../../../../model/employee.model";
import {EmployeeService} from "../../../../services/employee.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastrService} from "ngx-toastr";
import {SimpleModalComponent} from "ngx-simple-modal";
import {Leaving} from "../../../../model/leaving.model";
import {LeavingService} from "../../../../services/leaving.service";
import {LeavingRequest} from "../../../../model/post/leaving-request.model";

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css']
})
export class LeaveFormComponent  extends SimpleModalComponent<LeavingDialogModel, string> implements OnInit, LeavingDialogModel {

  isNew: boolean = true;
  form: any = {};
  leaving: Leaving;
  isNewAction: boolean;

  employees: Array<Employee> = new Array<Employee>();
  post_from;
  post_to;

  constructor(private leavingService: LeavingService,
              private employeeService : EmployeeService,
              private spinnerService: Ng4LoadingSpinnerService,
              private toastr: ToastrService) {
    super();
  }

  ngOnInit() {
    this.initEmployees();
    this.isNew = this.isNewAction;
    this.initData();
  }

  initEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      data => {
        this.employees = data;
      },
      error => {
      }
    );
  }

  apply() {
    this.result = 'refresh';
    this.close();
  }

  onSubmit() {
    this.getDateTimeString();
    let leaving = new LeavingRequest(
      this.isNewAction ? null : this.form.id,
      this.form.employeeId,
      this.post_from,
      this.post_to,
      this.form.dayOff);
    this.leavingService.create(leaving).subscribe(
      data => {
        if (data != null) {
          this.apply();
        } else {
          this.toastr.error('Failed to create leaving', 'Error');
        }
      },
      error => {
        this.toastr.error('Failed to create leaving', 'Error');
      }
    );
  }

  initData() : void {
    if (!this.isNew) {
      this.form.id = this.leaving.id;
      this.form.employeeId = this.leaving.employee.id;
      this.form.fromDate = new Date(this.leaving.fromDate);
      this.form.toDate = new Date(this.leaving.toDate);
      this.form.status = this.leaving.status;
      this.form.dayOff = this.leaving.dayOff;
    } else {
      this.form.dayOff = 1;
      let d = new Date();
      let formatted_date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      let dateStr = formatted_date + " 00:00:00";
      this.form.fromDate = new Date(dateStr);
      this.form.toDate = new Date(dateStr);
    }
  }


  getDateTimeString() {
    let fromDate = this.form.fromDate;
    let toDate = this.form.toDate;
    let d: Date = new Date(fromDate);
    let d2: Date = new Date(toDate);
    let formatted_date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    this.post_from  = formatted_date + " 00:00:00";

    let formatted_date2 = d2.getFullYear() + "-" + (d2.getMonth() + 1) + "-" + d2.getDate();
    this.post_to  = formatted_date2 + " 00:00:00";
  }

  approveLeaving() {
    this.spinnerService.show();
    this.leavingService.approve(this.leaving.id).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Approved successfully', 'Approved successfully');
          this.apply();
        } else {
          this.toastr.error(data.message, 'Failed');
        }
      },
      error => {
        this.spinnerService.hide();
        this.toastr.error('Failed to approve the leave', 'Failed');
      }
    );
  }

  cancelLeaving() {
    this.spinnerService.show();
    this.leavingService.cancel(this.leaving.id).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Cancelled successfully', 'Cancelled successfully');
         this.apply();
        } else {
          this.toastr.error(data.message, 'Failed');
        }
      },
      error => {
        this.spinnerService.hide();
        this.toastr.error('Failed to cancel the leave', 'Failed');
      }
    );
  }

  calculateDays() {
    console.log('hehehehe');
    let d1: Date = this.form.fromDate;
    console.log(d1);
    let d2: Date = this.form.toDate;
    console.log(d2);

    let between = Math.round((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
    console.log(between);
    between +=1;
    this.form.dayOff = between;
  }
}

export interface LeavingDialogModel {
  isNewAction: boolean;
  leaving: Leaving;
}

