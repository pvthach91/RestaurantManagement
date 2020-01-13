import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {configuration} from "../../../model/configuration.model";
import {SimpleModalService} from "ngx-simple-modal";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastrService} from "ngx-toastr";
import {Leaving} from "../../../model/leaving.model";
import {LeavingService} from "../../../services/leaving.service";
import {LeavingCriteriaSearch} from "../../../model/leaving-criteria-search.model";
import {LeaveFormComponent} from "./leave-form/leave-form.component";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ChangePage} from "../../../model/change-page.model";

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  @Output() currentPageEmit = new EventEmitter();
  leaves:Array<Leaving> = new Array<Leaving>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  form: any = {};

  private configuration = configuration;

  constructor(private leaveService: LeavingService,
              private SimpleModalService: SimpleModalService,
              private spinnerService: Ng4LoadingSpinnerService,
              private toastr: ToastrService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.form.status = 'all';
    this.search(1);
  }

  showDialog(isNew: boolean, leaving: Leaving) {
    this.SimpleModalService.addModal(LeaveFormComponent, {
      isNewAction: isNew,
      leaving: leaving})
      .subscribe((message) => {
        if (message != undefined && message != null && message == "refresh") {
          this.search(this.currentPage);
        }
      });
  }

  isOpen(reservation: Leaving): boolean {
    if (reservation.status == 'OPEN') {
      return true;
    } else {
      return false;
    }
  }
  isApproved(reservation: Leaving): boolean {
    if (reservation.status == 'APPROVED') {
      return true;
    } else {
      return false;
    }
  }

  isCancelled(reservation: Leaving): boolean {
    if (reservation.status == 'CANCELLED') {
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
    let rcs: LeavingCriteriaSearch = new LeavingCriteriaSearch(this.form.employeeName, status, page, configuration.pageSize);
    this.leaveService.getLeavings(rcs).subscribe(
      data => {
        this.leaves = data.data;
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
    this.leaveService.approve(reservationId).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Approved successfully', 'Approved successfully');
          this.leaves[index] = data.data;
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

  cancelReservation(reservationId: number, index: number) {
    this.spinnerService.show();
    this.leaveService.cancel(reservationId).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Cancelled successfully', 'Cancelled successfully');
          this.leaves[index] = data.data;
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
  goToEmployeePage() {
    let changePage: ChangePage = new ChangePage('employee', null);
    this.currentPageEmit.emit(changePage);
  }

  goToJobPagePage() {
    let changePage: ChangePage = new ChangePage('job', null);
    this.currentPageEmit.emit(changePage);
  }

  goToTimesheetPage() {
    let changePage: ChangePage = new ChangePage('timesheet', null);
    this.currentPageEmit.emit(changePage);
  }

}
