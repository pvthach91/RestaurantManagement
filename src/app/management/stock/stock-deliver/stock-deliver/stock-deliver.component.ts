import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StockMoving} from "../../../../model/stock-moving.model";
import {StockMovingService} from "../../../../services/stock-moving.service";
import {StockMovingCriteriaSearch} from "../../../../model/stock-moving-criteria-search.model";
import {configuration} from "../../../../model/configuration.model";
import {TokenStorageService} from "../../../../auth/token-storage.service";
import {ChangePage} from "../../../../model/change-page.model";

@Component({
  selector: 'app-stock-deliver',
  templateUrl: './stock-deliver.component.html',
  styleUrls: ['./stock-deliver.component.css']
})
export class StockDeliverComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  stocks:Array<StockMoving> = new Array<StockMoving>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  form: any = {};

  constructor(private stockMovingService: StockMovingService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.form.status = 'all';
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
    this.stockMovingService.getStockDelivers(ocs).subscribe(
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

  goToIngredientPage() {
    let changePage: ChangePage = new ChangePage('ingredient', null);
    this.currentPageEmit.emit(changePage);
  }

  goToStockReceivePage() {
    let changePage: ChangePage = new ChangePage('stockReceive', null);
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
}
