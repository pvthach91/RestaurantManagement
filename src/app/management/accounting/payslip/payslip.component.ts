import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SimpleModalService} from "ngx-simple-modal";
import {configuration} from "../../../model/configuration.model";
import {Payslip} from "../../../model/payslip.model";
import {PayslipService} from "../../../services/payslip.service";
import {PayslipCriteriaSearch} from "../../../model/payslip-criteria-search.model";
import {PayslipFormComponent} from "./payslip-form/payslip-form.component";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ChangePage} from "../../../model/change-page.model";

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  payslips:Array<Payslip> = new Array<Payslip>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  form: any = {};

  constructor(private payslipService: PayslipService,
              private SimpleModalService: SimpleModalService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.form.payslipType = 'all';
    this.search(1);
  }

  showDialog(isNew: boolean, payslip: Payslip) {
    this.SimpleModalService.addModal(PayslipFormComponent, {
      isNewAction: isNew,
      payslip: payslip})
      .subscribe((message) => {
        if (message != undefined && message != null && message == "refresh") {
          this.search(this.currentPage);
        }
      });
  }

  isBuyingIngredient(r: Payslip): boolean {
    if (r.payslipType == 'BUYING_INGREDIENT') {
      return true;
    } else {
      return false;
    }
  }
  isPayingSalary(r: Payslip): boolean {
    if (r.payslipType == 'PAYING_SALARY') {
      return true;
    } else {
      return false;
    }
  }

  isMarketing(r: Payslip): boolean {
    if (r.payslipType == 'MARKETING') {
      return true;
    } else {
      return false;
    }
  }

  isEvent(r: Payslip): boolean {
    if (r.payslipType == 'EVENT') {
      return true;
    } else {
      return false;
    }
  }

  isOther(r: Payslip): boolean {
    if (r.payslipType == 'OTHER') {
      return true;
    } else {
      return false;
    }
  }


  onSubmit() {
    this.search(1);
  }

  search(page: number) {
    let payslipType = this.form.payslipType;
    if (payslipType == 'all') {
      payslipType = null;
    }
    let r: PayslipCriteriaSearch = new PayslipCriteriaSearch(payslipType, this.form.ref, page, configuration.pageSize);
    this.payslipService.getPayslips(r).subscribe(
      data => {
        this.payslips = data.data;
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
