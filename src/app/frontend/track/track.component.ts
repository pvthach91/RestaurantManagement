import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {configuration} from "../../model/configuration.model";
import {OrderService} from "../../services/order.service";
import {ToastrService} from "ngx-toastr";
import {Order} from "../../model/order.model";
import {ChangePage} from "../../model/change-page.model";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  private configuration = configuration;
  order: Order;

  form: any = {};

  searchSuccessfully: boolean = false;

  isProcessing: boolean = false;
  isProcessed: boolean = false;
  isDelivering: boolean = false;
  isFinished: boolean = false;
  isCancelled: boolean = false;

  constructor(private orderService: OrderService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.orderService.trackOrder(this.form.orderId).subscribe(
      data => {
        if (data.success) {
          this.order = data.data;
          this.searchSuccessfully = true;
          this.setStatuses();
        } else {
          this.searchSuccessfully = false;
          this.toastr.error(data.message, 'Error');
        }
      },
      error => {
        this.searchSuccessfully = false;
        console.log(error);
      }
    );
  }

  trackByFn(index, item) {
    return item.dish.id;
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

  changePage(changePage: ChangePage) {
    this.goToPage(changePage);
  }
  goToPage(changePage: ChangePage) {
    this.currentPageEmit.emit(changePage);
  }

}
