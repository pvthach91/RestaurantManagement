import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ReportCriteriaSearch} from "../../../model/report-criteria-search.model";
import {ReportService} from "../../../services/report.service";
import {Report} from "../../../model/report.model";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ChangePage} from "../../../model/change-page.model";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  public pieChartType = 'pie';
  form: any = {};
  report: Report;

  constructor(private reportService: ReportService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    let d: Date = new Date();
    this.form.forYear = d.getFullYear();
    this.form.forMonth = d.getMonth() + 1;
    this.search();
  }


  onSubmit() {
    this.search();
  }

  search() {
    let rcs: ReportCriteriaSearch = new ReportCriteriaSearch(this.form.forYear, this.form.forMonth);
    this.reportService.getReports(rcs).subscribe(
      data => {
        this.report = data.data;
        console.log(this.report.expenseData);
      },
      error => {
        console.log(error);
      }
    );
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
