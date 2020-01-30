import {Component, OnInit} from '@angular/core';
import {ChangePage} from "../../../model/change-page.model";
import {TokenStorageService} from "../../../auth/token-storage.service";

@Component({
  selector: 'app-accounting-management',
  templateUrl: './accounting-management.component.html',
  styleUrls: ['./accounting-management.component.css']
})
export class AccountingManagementComponent implements OnInit {

  currentPage;
  id = 1;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if(!this.tokenStorage.hasAccountingRole()) {
      window.location.href = 'management/403';
      return;
    }
    this.currentPage = 'receipt';
  }

  changePage(changePage: ChangePage) {
    console.log(changePage);
    this.id = changePage.id;
    this.currentPage = changePage.page;
  }

  isReceiptPage(): boolean{
    return this.currentPage == 'receipt' ? true : false;
  }

  isPayslipPage(): boolean{
    return this.currentPage == 'payslip' ? true : false;
  }

  isPayrollPage(): boolean{
    return this.currentPage == 'payroll' ? true : false;
  }

  isPayrollDetailPage(): boolean{
    return this.currentPage == 'payrollDetail' ? true : false;
  }

  isRequestFromStockPage(): boolean{
    return this.currentPage == 'stockReceive' ? true : false;
  }

  isRequestFromStockDetailPage(): boolean{
    return this.currentPage == 'stockReceiveDetail' ? true : false;
  }

  isReportPage(): boolean{
    return this.currentPage == 'report' ? true : false;
  }

}
