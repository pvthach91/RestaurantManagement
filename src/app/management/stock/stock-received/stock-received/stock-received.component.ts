import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {configuration} from "../../../../model/configuration.model";
import {SimpleModalService} from "ngx-simple-modal";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastrService} from "ngx-toastr";
import {StockMoving} from "../../../../model/stock-moving.model";
import {StockMovingService} from "../../../../services/stock-moving.service";
import {StockMovingCriteriaSearch} from "../../../../model/stock-moving-criteria-search.model";
import {TokenStorageService} from "../../../../auth/token-storage.service";
import {ChangePage} from "../../../../model/change-page.model";

@Component({
  selector: 'app-stock-received',
  templateUrl: './stock-received.component.html',
  styleUrls: ['./stock-received.component.css']
})
export class StockReceivedComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  stocks:Array<StockMoving> = new Array<StockMoving>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  form: any = {};

  constructor(private stockMovingService: StockMovingService,
              private SimpleModalService: SimpleModalService,
              private spinnerService: Ng4LoadingSpinnerService,
              private toastr: ToastrService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.hasAccountingRole()) {
      this.form.status = 'ACCOUNTING_WAITING';
    } else {
      this.form.status = 'all';
    }
    this.search(1);
  }

  isAccountingWaiting(stock: StockMoving): boolean {
    if (stock.status == 'ACCOUNTING_WAITING') {
      return true;
    } else {
      return false;
    }
  }
  isAccountingApproved(stock: StockMoving): boolean {
    if (stock.status == 'ACCOUNTING_APPROVED') {
      return true;
    } else {
      return false;
    }
  }

  isStockApproved(stock: StockMoving): boolean {
    if (stock.status == 'STOCK_APPROVED') {
      return true;
    } else {
      return false;
    }
  }

  isCancelled(stock: StockMoving): boolean {
    if (stock.status == 'CANCELLED') {
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
    let ocs: StockMovingCriteriaSearch = new StockMovingCriteriaSearch(this.form.stockRef, status, page, configuration.pageSize);
    this.stockMovingService.getStockReceives(ocs).subscribe(
      data => {
        this.stocks = data.data;
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

  approveStock(stockId: number, index: number) {
    this.spinnerService.show();
    this.stockMovingService.approveStock(stockId).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Approved successfully', 'Approved successfully');
          this.stocks[index] = data.data;
        } else {
          this.toastr.error(data.message, 'Failed');
        }
      },
      error => {
        this.spinnerService.hide();
        this.toastr.error('Failed to approved the stock receive', 'Failed');
      }
    );
  }

  accountingApprove(stockId: number, index: number) {
    this.spinnerService.show();
    this.stockMovingService.approveStockFromAccounting(stockId).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Approved successfully', 'Approved successfully');
          this.search(1);
        } else {
          this.toastr.error(data.message, 'Failed');
        }
      },
      error => {
        this.spinnerService.hide();
        this.toastr.error('Failed to approved the stock receive', 'Failed');
      }
    );
  }

  goToIngredientPage() {
    let changePage: ChangePage = new ChangePage('ingredient', null);
    this.currentPageEmit.emit(changePage);
  }

  goToStockReceivePage() {
    let changePage: ChangePage = new ChangePage('stockReceive', null);
    this.currentPageEmit.emit(changePage);
  }

  goToStockReceiveDetailPage(id: number) {
    let changePage: ChangePage = new ChangePage('stockReceiveDetail', id);
    this.currentPageEmit.emit(changePage);
  }

  goToStockReceiveCreatePage() {
    let changePage: ChangePage = new ChangePage('stockReceiveCreate', null);
    this.currentPageEmit.emit(changePage);
  }

  goToStockDeliverPage() {
    let changePage: ChangePage = new ChangePage('stockDeliver', null);
    this.currentPageEmit.emit(changePage);
  }

  goToStockDeliverDetailPage(id: number) {
    let changePage: ChangePage = new ChangePage('stockDeliverDetail', id);
    this.currentPageEmit.emit(changePage);
  }

  goToStockDeliverCreatePage() {
    let changePage: ChangePage = new ChangePage('stockDeliverCreate', null);
    this.currentPageEmit.emit(changePage);
  }

  goToReceiptPage() {
    let changePage: ChangePage = new ChangePage('receipt', null);
    this.currentPageEmit.emit(changePage);
  }

  goToPayslipPage() {
    let changePage: ChangePage = new ChangePage('payslip', null);
    this.currentPageEmit.emit(changePage);
  }

  goToPayrollPage() {
    let changePage: ChangePage = new ChangePage('payroll', null);
    this.currentPageEmit.emit(changePage);
  }

  goToReportPage() {
    let changePage: ChangePage = new ChangePage('report', null);
    this.currentPageEmit.emit(changePage);
  }

}
