import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {configuration} from "../../../model/configuration.model";
import {SimpleModalService} from "ngx-simple-modal";
import {ToastrService} from "ngx-toastr";
import {ConfirmDialogComponent} from "../../../util/confirm/confirm-dialog.component";
import {Job} from "../../../model/job.model";
import {JobService} from "../../../services/job.service";
import {ManageJobFormComponent} from "./manage-job-form/manage-job-form.component";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ChangePage} from "../../../model/change-page.model";

@Component({
  selector: 'app-manage-job',
  templateUrl: './manage-job.component.html',
  styleUrls: ['./manage-job.component.css']
})
export class ManageJobComponent implements OnInit {

  @Output() currentPageEmit = new EventEmitter();
  jobs: Array<Job> = new Array<Job>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  private configuration = configuration;

  constructor(private jobService: JobService,
              private SimpleModalService: SimpleModalService,
              private toastr: ToastrService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.search(1);
  }

  showDialog(isNew: boolean, job: Job) {
    this.SimpleModalService.addModal(ManageJobFormComponent, {
      isNewAction: isNew,
      job: job})
      .subscribe((message) => {
        if (message != undefined && message != null && message == "refresh") {
          this.search(this.currentPage);
        }
      });
  }

  showDeleteDialog(id: number) {
    this.SimpleModalService.addModal(ConfirmDialogComponent, {
      title: 'Confirmation',
      message: 'Are you sure you want to delete the the job?'})
      .subscribe((isConfirmed) => {
        if (isConfirmed != undefined && isConfirmed != null && isConfirmed == true) {
         this.deleteJob(id);
          this.search(this.currentPage);
        }
      });
  }

  deleteJob (id: number) {
    this.jobService.deleteJob(id).subscribe(
      data => {
        if (data.success == true) {
          this.toastr.success('Job has been deleted', 'Info');
          this.search(this.currentPage);
        } else {
          this.toastr.error('Job to delete dish', 'Error');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  search(page: number) {
    this.jobService.getJobs(page, configuration.pageSize).subscribe(
      data => {
        this.jobs = data.data;
        this.currentPage = data.current;
        this.totalPage = data.total;
        this.makePages();
      },
      error => {
        console.log(error);
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

  goToEmployeePage() {
    let changePage: ChangePage = new ChangePage('employee', null);
    this.currentPageEmit.emit(changePage);
  }

  goToLeavePage() {
    let changePage: ChangePage = new ChangePage('leave', null);
    this.currentPageEmit.emit(changePage);
  }

  goToTimesheetPage() {
    let changePage: ChangePage = new ChangePage('timesheet', null);
    this.currentPageEmit.emit(changePage);
  }

}
