import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Dish} from "../../../model/dish.model";
import {DishFormComponent} from "../dish/dish-form/dish-form.component";
import {configuration} from "../../../model/configuration.model";
import {SimpleModalService} from "ngx-simple-modal";
import {ToastrService} from "ngx-toastr";
import {OrderService} from "../../../services/order.service";
import {OrderCriteriaSearch} from "../../../model/order-criteria-search.model";
import {Order} from "../../../model/order.model";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ChangePage} from "../../../model/change-page.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  orders:Array<Order> = new Array<Order>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  form: any = {};

  private configuration = configuration;

  constructor(private orderService: OrderService,
              private SimpleModalService: SimpleModalService,
              private spinnerService: Ng4LoadingSpinnerService,
              private toastr: ToastrService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.form.status = 'all';
    this.search(1);
  }

  isProcessing(order: Order): boolean {
    if (order.status == 'PROCESSING') {
      return true;
    } else {
      return false;
    }
  }
  isProcessed(order: Order): boolean {
    if (order.status == 'PROCESSED') {
      return true;
    } else {
      return false;
    }
  }

  isDelivering(order: Order): boolean {
    if (order.status == 'DELIVERING') {
      return true;
    } else {
      return false;
    }
  }

  isFinished(order: Order): boolean {
    if (order.status == 'FINISHED') {
      return true;
    } else {
      return false;
    }
  }

  isCancelled(order: Order): boolean {
    if (order.status == 'CANCELLED') {
      return true;
    } else {
      return false;
    }
  }

  showDialog(isNew: boolean, dish: Dish) {
    this.SimpleModalService.addModal(DishFormComponent, {
      isNewAction: isNew,
      dish: dish})
      .subscribe((message) => {
        if (message != undefined && message != null && message == "refresh") {
          this.search(this.currentPage);
        }
      });
  }

  onSubmit() {
    this.search(1);
  }

  search(page: number) {
    let status = this.form.status;
    if (status == 'all') {
      status = null;
    }
    let ocs: OrderCriteriaSearch = new OrderCriteriaSearch(this.form.orderId, status, page, configuration.pageSize);
    this.orderService.getOrders(ocs).subscribe(
      data => {
        this.orders = data.data;
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

  processOrder(orderId: number, index: number) {
    this.spinnerService.show();
    this.orderService.process(orderId).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Processed successfully', 'Processed successfully');
          this.orders[index] = data.data;
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

  deliverOrder(orderId: number, index: number) {
    this.spinnerService.show();
    this.orderService.deliver(orderId).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Delivering successfully', 'Delivering successfully');
          this.orders[index] = data.data;
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

  finishOrder(orderId: number, index: number) {
    this.spinnerService.show();
    this.orderService.finish(orderId).subscribe(
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
        this.toastr.error('Failed to finish the order', 'Failed');
      }
    );
  }

  cancelOrder(orderId: number, index: number) {
    this.spinnerService.show();
    this.orderService.cancel(orderId).subscribe(
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
        this.toastr.error('Failed to cancel the order', 'Failed');
      }
    );
  }

  goToDishPage() {
    let changePage: ChangePage = new ChangePage('dish', null);
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
