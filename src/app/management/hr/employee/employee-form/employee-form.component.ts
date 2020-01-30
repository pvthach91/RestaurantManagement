import {Component, OnInit} from '@angular/core';
import {configuration} from "../../../../model/configuration.model";
import {FileUploadService} from "../../../../services/file-upload.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastrService} from "ngx-toastr";
import {SimpleModalComponent} from "ngx-simple-modal";
import {Employee} from "../../../../model/employee.model";
import {DepartmentService} from "../../../../services/department.service";
import {Department} from "../../../../model/department.model";
import {EmployeeService} from "../../../../services/employee.service";
import {EmployeeRequest} from "../../../../model/post/employee-request.model";

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent  extends SimpleModalComponent<EmpoyeeDialogModel, string> implements OnInit, EmpoyeeDialogModel {

  isNew: boolean = true;
  form: any = {};
  employee: Employee;
  isNewAction: boolean;

  selectedFile: File;
  displayOldImages = false;
  newImage: string;

  postPhoto: string;
  post_joinDate;
  post_dob;

  private configuration = configuration;

  departments: Array<Department> = new Array<Department>();


  constructor(private employeeService: EmployeeService,
              private departmentService : DepartmentService,
              private fileUploadService: FileUploadService,
              private spinnerService: Ng4LoadingSpinnerService,
              private toastr: ToastrService) {
    super();
  }

  ngOnInit() {
    this.initDepartment();
    this.isNew = this.isNewAction;
    this.initData();
  }

  initDepartment() {
    this.departmentService.getDepartments().subscribe(
      data => {
        this.departments = data;
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
    if (this.displayOldImages) {
      this.postPhoto = this.employee.photo;
      this.postEmployee();
    } else {
      if (this.selectedFile != null) {
        this.spinnerService.show();
        this.fileUploadService.postEmployeePhoto(this.selectedFile).subscribe(
          data => {
            this.spinnerService.hide();
            if (data.success) {
              this.postPhoto = data.data;
              console.log(data.data);
              this.postEmployee();
            }
          },
          error => {
            this.spinnerService.hide();
            console.log(JSON.stringify(error));
          }
        );
      } else {
        this.spinnerService.show();
        this.postEmployee();
        this.spinnerService.hide();
      }
    }
  }

  postEmployee() {
    this.getDateTimeString();
    let employee = new EmployeeRequest(
      this.isNewAction ? null : this.form.id,
      this.form.departmentId,
      this.form.sex,
      this.form.name,
      this.form.address,
      this.form.phone,
      this.post_dob,
      this.post_joinDate,
      this.postPhoto,
      this.form.salaryRate,
      this.form.currentDayOff,
      );
    this.employeeService.create(employee).subscribe(
      data => {
        if (data != null) {
          this.apply();
        } else {
          this.toastr.error('Failed to create employee', 'Error');
        }
      },
      error => {
        this.toastr.error('Failed to create employee', 'Error');
      }
    );
  }

  initData() : void {
    if (!this.isNew) {
      this.form.id = this.employee.id;
      this.form.departmentId = this.employee.department.id;
      this.form.sex = this.employee.sex;
      this.form.employeeId = this.employee.employeeId;
      this.form.name = this.employee.name;
      this.form.address = this.employee.address;
      this.form.phone = this.employee.phone;
      this.form.dob = new Date(this.employee.dob);
      this.form.joinDate = new Date(this.employee.joinDate);
      this.form.photo = this.employee.photo;
      this.form.salaryRate = this.employee.salaryRate;
      this.form.currentDayOff = this.employee.currentDayOff;

      this.displayOldImages = true;
    }
  }

  onFileChanged(event: any): void {
    let files = event.target.files;
    if (files != null) {
      this.displayOldImages = false;
      this.selectedFile = files[0];
      this.makeDisplayImages(files[0]);
    }
  }

  makeDisplayImages(file: File): void {
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.newImage = e.target.result;
    }
    reader.readAsDataURL(file);
  }

  getDateTimeString() {
    let dob = this.form.dob;
    let joinDate = this.form.joinDate;
    let d: Date = new Date(dob);
    let d2: Date = new Date(joinDate);
    let formatted_date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    this.post_dob  = formatted_date + " 00:00:00";

    let formatted_date2 = d2.getFullYear() + "-" + (d2.getMonth() + 1) + "-" + d2.getDate();
    this.post_joinDate  = formatted_date2 + " 00:00:00";
  }
}

export interface EmpoyeeDialogModel {
  isNewAction: boolean;
  employee: Employee;
}

