import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {configuration} from "../../../model/configuration.model";
import {SimpleModalService} from "ngx-simple-modal";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastrService} from "ngx-toastr";
import {Timesheet} from "../../../model/timesheet.model";
import {TimesheetService} from "../../../services/timesheet.service";
import {TimesheetCriteriaSearch} from "../../../model/timesheet-criteria-search.model";
import {TimesheetFormComponent} from "./timesheet-form/timesheet-form.component";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ChangePage} from "../../../model/change-page.model";

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();
  timesheets:Array<Timesheet> = new Array<Timesheet>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  form: any = {};

  constructor(private timesheetService: TimesheetService,
              private SimpleModalService: SimpleModalService,
              private spinnerService: Ng4LoadingSpinnerService,
              private toastr: ToastrService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.form.status = 'all';
    this.search(1);
  }

  showDialog(isNew: boolean, timesheet: Timesheet) {
    this.SimpleModalService.addModal(TimesheetFormComponent, {
      isNewAction: isNew,
      timesheet: timesheet})
      .subscribe((message) => {
        if (message != undefined && message != null && message == "refresh") {
          this.search(this.currentPage);
        }
      });
  }

  isOpen(timesheet: Timesheet): boolean {
    if (timesheet.status == 'OPEN') {
      return true;
    } else {
      return false;
    }
  }
  isApproved(timesheet: Timesheet): boolean {
    if (timesheet.status == 'APPROVED') {
      return true;
    } else {
      return false;
    }
  }

  isCancelled(timesheet: Timesheet): boolean {
    if (timesheet.status == 'CANCELLED') {
      return true;
    } else {
      return false;
    }
  }

  isWorked(timesheet: Timesheet): boolean {
    if (timesheet.timesheetType == 'WORKED') {
      return true;
    } else {
      return false;
    }
  }

  isLeavedWithPaying(timesheet: Timesheet): boolean {
    if (timesheet.timesheetType == 'LEAVED_WITH_PAYING') {
      return true;
    } else {
      return false;
    }
  }

  isLeavedWithoutPaying(timesheet: Timesheet): boolean {
    if (timesheet.timesheetType == 'LEAVED_WITHOUT_PAYING') {
      return true;
    } else {
      return false;
    }
  }


  onSubmit() {
    this.search(1);
  }

  search(page: number) {
    let status = this.form.status;
    if (status == 'all') {
      status = null;
    }
    let rcs: TimesheetCriteriaSearch = new TimesheetCriteriaSearch(this.form.employeeName, status, page, configuration.pageSize);
    this.timesheetService.getTimesheets(rcs).subscribe(
      data => {
        this.timesheets = data.data;
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

  approveReservation(reservationId: number, index: number) {
    this.spinnerService.show();
    this.timesheetService.approve(reservationId).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Approved successfully', 'Approved successfully');
          this.timesheets[index] = data.data;
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

  cancelReservation(reservationId: number, index: number) {
    this.spinnerService.show();
    this.timesheetService.cancel(reservationId).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Cancelled successfully', 'Cancelled successfully');
          this.timesheets[index] = data.data;
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

  goToEmployeePage() {
    let changePage: ChangePage = new ChangePage('employee', null);
    this.currentPageEmit.emit(changePage);
  }

  goToLeavePage() {
    let changePage: ChangePage = new ChangePage('leave', null);
    this.currentPageEmit.emit(changePage);
  }

  goToJobPage() {
    let changePage: ChangePage = new ChangePage('job', null);
    this.currentPageEmit.emit(changePage);
  }
}
