import { Component, OnInit } from '@angular/core';
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastrService} from "ngx-toastr";
import {SimpleModalComponent} from "ngx-simple-modal";
import {Job} from "../../../../model/job.model";
import {JobService} from "../../../../services/job.service";
import {JobRequest} from "../../../../model/post/job-request.model";

@Component({
  selector: 'app-manage-job-form',
  templateUrl: './manage-job-form.component.html',
  styleUrls: ['./manage-job-form.component.css']
})
export class ManageJobFormComponent  extends SimpleModalComponent<JobDialogModel, string> implements OnInit, JobDialogModel {

  isNew: boolean = true;
  form: any = {};
  job: Job;
  isNewAction: boolean;

  constructor(private jobService: JobService,
              private spinnerService: Ng4LoadingSpinnerService,
              private toastr: ToastrService) {
    super();
  }

  ngOnInit() {
    this.isNew = this.isNewAction;
    this.initData();
  }

  apply() {
    this.result = 'refresh';
    this.close();
  }

  onSubmit() {
    let dish = new JobRequest(
      this.isNewAction ? null : this.form.id,
      this.form.position,
      this.form.description,
      this.form.experienceYear,
      this.form.educationLevel,
      this.getDateTimeString(),
      this.form.salary);
    this.jobService.create(dish).subscribe(
      data => {
        if (data != null) {
          this.apply();
        } else {
          this.toastr.error('Failed to create dish', 'Error');
        }
      },
      error => {
        this.toastr.error('Failed to create dish', 'Error');
      }
    );
  }

  initData() : void {
    if (!this.isNew) {
      this.form.id = this.job.id;
      this.form.position = this.job.position;
      this.form.description = this.job.description;
      this.form.experienceYear = this.job.experienceYear;
      this.form.educationLevel = this.job.educationLevel;
      this.form.expiredDate = new Date(this.job.expiredDate);
      this.form.salary = this.job.salary;
    }
  }

  getDateTimeString(): string {
    let date = this.form.expiredDate;
    let d: Date = new Date(date);
    let formatted_date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    let result  = formatted_date + " 00:00:00";
    console.log(result);

    return result;
  }

}

export interface JobDialogModel {
  isNewAction: boolean;
  job: Job;
}
