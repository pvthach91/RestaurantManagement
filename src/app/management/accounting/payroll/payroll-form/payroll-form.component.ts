import { Component, OnInit } from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {Employee} from "../../../../model/employee.model";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastrService} from "ngx-toastr";
import {Payroll} from "../../../../model/payroll.model";
import {DepartmentService} from "../../../../services/department.service";
import {DepartmentEmployee} from "../../../../model/department-employee.model";
import {PayrollRequest} from "../../../../model/post/payroll-request.model";
import {PayrollService} from "../../../../services/payroll.service";
import {ChangePage} from "../../../../model/change-page.model";

@Component({
  selector: 'app-payroll-form',
  templateUrl: './payroll-form.component.html',
  styleUrls: ['./payroll-form.component.css']
})
export class PayrollFormComponent extends SimpleModalComponent<PayrollDialogModel, string> implements OnInit, PayrollDialogModel {

  isNew: boolean = true;
  form: any = {};
  payroll: Payroll;
  isNewAction: boolean;

  departments: Array<DepartmentEmployee> = new Array<DepartmentEmployee>();
  employees: Array<Employee> = new Array<Employee>();

  constructor(private payrollService: PayrollService,
              private departmentService : DepartmentService,
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
    this.departmentService.getDepartmentsWithEmployees().subscribe(
      data => {
        this.departments = data;
        this.form.department = this.departments[0];
        this.employees = this.departments[0].employees;
      },
      error => {
      }
    );
  }

  apply() {
    // this.result = 'refresh';
    this.close();
  }

  changeDepartment() {
    this.employees = this.form.department.employees;
    if (this.employees.length > 0) {
      this.form.employeeId = this.employees[0].employeeId;
    } else {
      this.form.employeeId = null;
    }
  }

  changeEmployee() {
    console.log(this.form.employeeId);
  }

  onSubmit() {
    let payroll = new PayrollRequest(
      this.form.employeeId,
      this.form.forYear,
      this.form.forMonth);

    console.log(payroll);
    this.payrollService.create(payroll).subscribe(
      data => {
        if (data.success) {
          this.result = data.data;
          this.apply();
        } else {
          this.toastr.error(data.message, 'Error');
        }
      },
      error => {
        this.toastr.error('Failed to create payroll', 'Error');
      }
    );
  }

  initData() : void {
    if (!this.isNew) {
      this.form.id = this.payroll.id;
      this.form.employee = this.payroll.employee;
      this.form.forYear = this.payroll.forYear;
      this.form.forMonth = this.payroll.forMonth;
      this.form.totalSalary = this.payroll.totalSalary;
    } else {
      let d = new Date();
      this.form.forYear = d.getFullYear();
      this.form.forMonth = d.getMonth() + 1;
    }
  }

}

export interface PayrollDialogModel {
  isNewAction: boolean;
  payroll: Payroll;
}
