import { Component, OnInit } from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {Employee} from "../../../../model/employee.model";
import {EmployeeService} from "../../../../services/employee.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastrService} from "ngx-toastr";
import {Timesheet} from "../../../../model/timesheet.model";
import {TimesheetService} from "../../../../services/timesheet.service";
import {TimesheetRequest} from "../../../../model/post/timesheet-request.model";

@Component({
  selector: 'app-timesheet-form',
  templateUrl: './timesheet-form.component.html',
  styleUrls: ['./timesheet-form.component.css']
})
export class TimesheetFormComponent extends SimpleModalComponent<TimeSheetDialogModel, string> implements OnInit, TimeSheetDialogModel {

  isNew: boolean = true;
  form: any = {};
  timesheet: Timesheet;
  isNewAction: boolean;

  employees: Array<Employee> = new Array<Employee>();
  post_forDate;

  constructor(private timesheetService: TimesheetService,
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
    let timesheet = new TimesheetRequest(
      this.isNewAction ? null : this.form.id,
      this.form.employeeId,
      this.form.workingHour,
      this.post_forDate);
    this.timesheetService.create(timesheet).subscribe(
      data => {
        if (data.success) {
          this.apply();
        } else {
          this.toastr.error(data.message, 'Error');
        }
      },
      error => {
        this.toastr.error('Failed to create timesheet', 'Error');
      }
    );
  }

  initData() : void {
    if (!this.isNew) {
      this.form.id = this.timesheet.id;
      this.form.employeeId = this.timesheet.employee.id;
      this.form.dateCreated = new Date(this.timesheet.dateCreated);
      this.form.workingHour = this.timesheet.workingHour;
      this.form.forDate = new Date(this.timesheet.forDate);
      this.form.status = this.timesheet.status;
    } else {
      let d = new Date();
      let formatted_date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      let dateStr = formatted_date + " 00:00:00";
      this.form.forDate = new Date(dateStr);
    }
  }


  getDateTimeString() {
    let forDate = this.form.forDate;
    let d: Date = new Date(forDate);
    let formatted_date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    this.post_forDate  = formatted_date + " 00:00:00";
  }

  approveTimeSheet() {
    this.spinnerService.show();
    this.timesheetService.approve(this.timesheet.id).subscribe(
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
        this.toastr.error('Failed to approve the timesheet', 'Failed');
      }
    );
  }

  cancelTimeSheet() {
    this.spinnerService.show();
    this.timesheetService.cancel(this.timesheet.id).subscribe(
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
        this.toastr.error('Failed to cancel the timesheet', 'Failed');
      }
    );
  }
}

export interface TimeSheetDialogModel {
  isNewAction: boolean;
  timesheet: Timesheet;
}
