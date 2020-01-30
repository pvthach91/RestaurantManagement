import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SimpleModalService} from "ngx-simple-modal";
import {configuration} from "../../../model/configuration.model";
import {Receipt} from "../../../model/receipt.model";
import {ReceiptService} from "../../../services/receipt.service";
import {ReceiptCriteriaSearch} from "../../../model/receipt-criteria-search.model";
import {ReceiptFormComponent} from "./receipt-form/receipt-form.component";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ChangePage} from "../../../model/change-page.model";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  receipts:Array<Receipt> = new Array<Receipt>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  form: any = {};

  constructor(private receiptService: ReceiptService,
              private SimpleModalService: SimpleModalService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.form.receiptType = 'all';
    this.search(1);
  }

  showDialog(isNew: boolean, receipt: Receipt) {
    this.SimpleModalService.addModal(ReceiptFormComponent, {
      isNewAction: isNew,
      receipt: receipt})
      .subscribe((message) => {
        if (message != undefined && message != null && message == "refresh") {
          this.search(this.currentPage);
        }
      });
  }

  isSellingOnline(r: Receipt): boolean {
    if (r.receiptType == 'SELLING_ONLINE') {
      return true;
    } else {
      return false;
    }
  }
  isSellingOffline(r: Receipt): boolean {
    if (r.receiptType == 'SELLING_OFFLINE') {
      return true;
    } else {
      return false;
    }
  }

  isOther(r: Receipt): boolean {
    if (r.receiptType == 'OTHER') {
      return true;
    } else {
      return false;
    }
  }


  onSubmit() {
    this.search(1);
  }

  search(page: number) {
    let receiptType = this.form.receiptType;
    if (receiptType == 'all') {
      receiptType = null;
    }
    let r: ReceiptCriteriaSearch = new ReceiptCriteriaSearch(receiptType, this.form.ref, page, configuration.pageSize);
    this.receiptService.getReceipts(r).subscribe(
      data => {
        this.receipts = data.data;
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

  goToStockReceiverPage() {
    let changePage: ChangePage = new ChangePage('stockReceive', null);
    this.currentPageEmit.emit(changePage);
  }

  goToReportPage() {
    let changePage: ChangePage = new ChangePage('report', null);
    this.currentPageEmit.emit(changePage);
  }
}
