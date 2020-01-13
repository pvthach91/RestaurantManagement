import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {configuration} from "../../../model/configuration.model";
import {SimpleModalService} from "ngx-simple-modal";
import {ToastrService} from "ngx-toastr";
import {ReservationService} from "../../../services/reservation.service";
import {ReservationCriteriaSearch} from "../../../model/reservation-criteria-search.model";
import {Reservation} from "../../../model/reservation.model";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ChangePage} from "../../../model/change-page.model";

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.css']
})
export class ReservationManagementComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  orders:Array<Reservation> = new Array<Reservation>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  form: any = {};

  private configuration = configuration;

  constructor(private reservationService: ReservationService,
              private SimpleModalService: SimpleModalService,
              private spinnerService: Ng4LoadingSpinnerService,
              private toastr: ToastrService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.form.status = 'all';
    this.search(1);
  }

  isProcessing(reservation: Reservation): boolean {
    if (reservation.status == 'PROCESSING') {
      return true;
    } else {
      return false;
    }
  }
  isReserved(reservation: Reservation): boolean {
    if (reservation.status == 'RESERVED') {
      return true;
    } else {
      return false;
    }
  }


  isFinished(reservation: Reservation): boolean {
    if (reservation.status == 'FINISHED') {
      return true;
    } else {
      return false;
    }
  }

  isCancelled(reservation: Reservation): boolean {
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
    let rcs: ReservationCriteriaSearch = new ReservationCriteriaSearch(this.form.reservationId, status, page, configuration.pageSize);
    this.reservationService.getReservations(rcs).subscribe(
      data => {
        this.orders = data.data;
        this.currentPage = data.current;
        this.totalPage = data.total;
        this.makePages();
        console.log(JSON.stringify(data.data));
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
    this.reservationService.approve(reservationId).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Approved successfully', 'Approved successfully');
          this.orders[index] = data.data;
        } else {
          this.toastr.error(data.message, 'Failed');
        }
      },
      error => {
        this.spinnerService.hide();
        this.toastr.error('Failed to approve the reservation', 'Failed');
      }
    );
  }

  finishReservation(reservationId: number, index: number) {
    this.spinnerService.show();
    this.reservationService.finish(reservationId).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Finished successfully', 'Finished successfully');
          this.orders[index] = data.data;
        } else {
          this.toastr.error(data.message, 'Failed');
        }
      },
      error => {
        this.spinnerService.hide();
        this.toastr.error('Failed to finish the reservation', 'Failed');
      }
    );
  }

  cancelReservation(reservationId: number, index: number) {
    this.spinnerService.show();
    this.reservationService.cancel(reservationId).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Cancelled successfully', 'Cancelled successfully');
          this.orders[index] = data.data;
        } else {
          this.toastr.error(data.message, 'Failed');
        }
      },
      error => {
        this.spinnerService.hide();
        this.toastr.error('Failed to cancel the reservation', 'Failed');
      }
    );
  }
  goToDishPage() {
    let changePage: ChangePage = new ChangePage('dish', null);
    this.currentPageEmit.emit(changePage);
  }

  goToOrderPage() {
    let changePage: ChangePage = new ChangePage('order', null);
    this.currentPageEmit.emit(changePage);
  }
}
