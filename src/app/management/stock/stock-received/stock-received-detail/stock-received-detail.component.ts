import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TokenStorageService} from "../../../../auth/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {SimpleModalService} from "ngx-simple-modal";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {IngredientService} from "../../../../services/Ingredient.service";
import {StockMovingService} from "../../../../services/stock-moving.service";
import {StockMoving} from "../../../../model/stock-moving.model";
import {ChangePage} from "../../../../model/change-page.model";

@Component({
  selector: 'app-stock-received-detail',
  templateUrl: './stock-received-detail.component.html',
  styleUrls: ['./stock-received-detail.component.css']
})
export class StockReceivedDetailComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  @Input() id: number;
  stock: StockMoving;
  isAccWaiting = false;
  isAccApproved = false;
  isStockApproved = false;
  isCancelled = false;


  constructor(private route: ActivatedRoute,
              private tokenStorage: TokenStorageService,
              private toastr: ToastrService,
              private SimpleModalService: SimpleModalService,
              private spinnerService: Ng4LoadingSpinnerService,
              private ingredientService: IngredientService,
              private stockMovingService: StockMovingService) {
  }

  ngOnInit() {
    this.stockMovingService.getStock(this.id).subscribe(
      data => {
        if (data.success) {
          this.stock = data.data;
          this.setStatuses();
        } else {

        }
      },
      error => {
        console.log(error);
      }
    );
  }


  setStatuses(){
    if (this.stock.status == 'ACCOUNTING_WAITING') {
      this.isAccWaiting = true;
    } else {
      this.isAccWaiting = false;
    }

    if (this.stock.status == 'ACCOUNTING_APPROVED') {
      this.isAccApproved = true;
    } else {
      this.isAccApproved = false;
    }

    if (this.stock.status == 'STOCK_APPROVED') {
      this.isStockApproved = true;
    } else {
      this.isStockApproved = false;
    }

    if (this.stock.status == 'CANCELLED') {
      this.isCancelled = true;
    } else {
      this.isCancelled = false;
    }
  }

  approveStock() {
    this.spinnerService.show();
    this.stockMovingService.approveStock(this.stock.id).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Approved successfully', 'Approved successfully');
          this.stock = data.data;
          this.setStatuses();
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

  accountingApprove() {
    this.spinnerService.show();
    this.stockMovingService.approveStockFromAccounting(this.stock.id).subscribe(
      data => {
        this.spinnerService.hide();
        if (data.success) {
          this.toastr.success('Approved successfully', 'Approved successfully');
          this.stock = data.data;
          this.goToStockReceivePage();
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
