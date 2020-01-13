import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SimpleModalService} from "ngx-simple-modal";
import {configuration} from "../../../model/configuration.model";
import {PayrollCriteriaSearch} from "../../../model/payroll-criteria-search.model";
import {PayrollService} from "../../../services/payroll.service";
import {Payroll} from "../../../model/payroll.model";
import {PayrollFormComponent} from "./payroll-form/payroll-form.component";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ChangePage} from "../../../model/change-page.model";

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  payrolls:Array<Payroll> = new Array<Payroll>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  form: any = {};

  constructor(private payrollService: PayrollService,
              private SimpleModalService: SimpleModalService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    let d: Date = new Date();
    this.form.forYear = d.getFullYear();
    this.form.forMonth = d.getMonth() + 1;
    this.form.sort = 0;
    this.search(1);
  }

  showDialog(isNew: boolean, payroll: Payroll) {
    this.SimpleModalService.addModal(PayrollFormComponent, {
      isNewAction: isNew,
      payroll: payroll})
      .subscribe((message) => {
        if (message != undefined && message != null) {
          this.goToPayrollDetailPage(parseInt(message));
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
    let p: PayrollCriteriaSearch = new PayrollCriteriaSearch(this.form.employeeId, this.form.forYear, this.form.forMonth, page, configuration.pageSize, this.form.sort);
    this.payrollService.getPayrolls(p).subscribe(
      data => {
        this.payrolls = data.data;
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

  goToPayrollDetailPage(id: number) {
    let changePage: ChangePage = new ChangePage('payrollDetail',  id);
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
