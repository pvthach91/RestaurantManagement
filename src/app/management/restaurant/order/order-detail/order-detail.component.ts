import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {configuration} from "../../../../model/configuration.model";
import {OrderService} from "../../../../services/order.service";
import {ActivatedRoute} from "@angular/router";
import {Order} from "../../../../model/order.model";
import {ToastrService} from "ngx-toastr";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {TokenStorageService} from "../../../../auth/token-storage.service";
import {ChangePage} from "../../../../model/change-page.model";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  private configuration = configuration;

  @Input() id: number;
  order: Order;
  isProcessing: boolean = false;
  isProcessed: boolean = false;
  isDelivering: boolean = false;
  isFinished: boolean = false;
  isCancelled: boolean = false;


  constructor(private route: ActivatedRoute,
              private toastr: ToastrService,
              private spinnerService: Ng4LoadingSpinnerService,
              private orderService: OrderService,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    console.log('detail constructor ' + this.id);
    this.orderService.getOrder(this.id).subscribe(
      data => {
        if (data.success) {
          this.order = data.data;
          this.setStatuses();
        } else {

        }
      },
      error => {
        console.log(error);
      }
    );
  }

  setStatuses(){
    if (this.order.status == 'PROCESSING') {
      this.isProcessing = true;
    } else {
      this.isProcessing = false;
    }

    if (this.order.status == 'PROCESSED') {
      this.isProcessed = true;
    } else {
      this.isProcessed = false;
    }

    if (this.order.status == 'DELIVERING') {
      this.isDelivering = true;
    } else {
      this.isDelivering = false;
    }

    if (this.order.status == 'FINISHED') {
      this.isFinished = true;
    } else {
      this.isFinished = false;
    }

    if (this.order.status == 'CANCELLED') {
      this.isCancelled = true;
    } else {
      this.isCancelled = false;
    }
  }

  processOrder(orderId: number) {
    this.spinnerService.show();
    this.orderService.process(orderId).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Processed successfully', 'Processed successfully');
          this.order = data.data;
          this.setStatuses();
        } else {
          this.toastr.error(data.message, 'Failed');
        }
      },
      error => {
        this.spinnerService.hide();
        this.toastr.error('Failed to process the order', 'Failed');
      }
    );
  }

  deliverOrder(orderId: number) {
    this.spinnerService.show();
    this.orderService.deliver(orderId).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Delivering successfully', 'Delivering successfully');
          this.order = data.data;
          this.setStatuses();
        } else {
          this.toastr.error(data.message, 'Failed');
        }
      },
      error => {
        this.spinnerService.hide();
        this.toastr.error('Failed to deliver the order', 'Failed');
      }
    );
  }

  finishOrder(orderId: number) {
    this.spinnerService.show();
    this.orderService.finish(orderId).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Finished successfully', 'Finished successfully');
          this.order = data.data;
          this.setStatuses();
        } else {
          this.toastr.error(data.message, 'Failed');
        }
      },
      error => {
        this.spinnerService.hide();
        this.toastr.error('Failed to finish the order', 'Failed');
      }
    );
  }

  cancelOrder(orderId: number) {
    this.spinnerService.show();
    this.orderService.cancel(orderId).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Cancelled successfully', 'Cancelled successfully');
          this.order = data.data;
          this.setStatuses();
        } else {
          this.toastr.error(data.message, 'Failed');
        }
      },
      error => {
        this.spinnerService.hide();
        this.toastr.error('Failed to cancel the order', 'Failed');
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

  goToReservationPage() {
    let changePage: ChangePage = new ChangePage('reservation', null);
    this.currentPageEmit.emit(changePage);
  }

  goToOrderDetailPage(id: number) {
    let changePage: ChangePage = new ChangePage('orderDetail', id);
    this.currentPageEmit.emit(changePage);
  }

}

