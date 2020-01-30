import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Payroll} from "../../../../model/payroll.model";
import {PayrollService} from "../../../../services/payroll.service";
import {ActivatedRoute} from "@angular/router";
import {Timesheet} from "../../../../model/timesheet.model";
import {PayrollItem} from "../../../../model/payroll-item.model";
import {TokenStorageService} from "../../../../auth/token-storage.service";
import {ChangePage} from "../../../../model/change-page.model";

@Component({
  selector: 'app-payroll-detail',
  templateUrl: './payroll-detail.component.html',
  styleUrls: ['./payroll-detail.component.css']
})
export class PayrollDetailComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  @Input() id: number;
  payroll: Payroll;
  payrollItems: Array<PayrollItem> = new Array<PayrollItem>();

  constructor(private payrollService: PayrollService,
              private tokenStorage: TokenStorageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.payrollService.getPayroll(this.id).subscribe(
      data => {
        if (data.success) {
          this.payroll = data.data;
          this.payrollItems = this.payroll.items;
        } else {

        }
      },
      error => {
        console.log(error);
      }
    );
  }
  isWorked(timesheet: Timesheet): boolean {
    if (timesheet.timesheetType == 'WORKED') {
      return true;
    } else {
      return false;
    }
  }

  isLeavedWithPaying(timesheet: Timesheet): boolean {
    if (timesheet.timesheetType == 'LEAVED_WITH_PAYING') {
      return true;
    } else {
      return false;
    }
  }

  isLeavedWithoutPaying(timesheet: Timesheet): boolean {
    if (timesheet.timesheetType == 'LEAVED_WITHOUT_PAYING') {
      return true;
    } else {
      return false;
    }
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
