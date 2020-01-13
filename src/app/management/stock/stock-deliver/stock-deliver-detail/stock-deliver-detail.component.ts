import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StockMoving} from "../../../../model/stock-moving.model";
import {ActivatedRoute} from "@angular/router";
import {TokenStorageService} from "../../../../auth/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {SimpleModalService} from "ngx-simple-modal";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {IngredientService} from "../../../../services/Ingredient.service";
import {StockMovingService} from "../../../../services/stock-moving.service";
import {ChangePage} from "../../../../model/change-page.model";

@Component({
  selector: 'app-stock-deliver-detail',
  templateUrl: './stock-deliver-detail.component.html',
  styleUrls: ['./stock-deliver-detail.component.css']
})
export class StockDeliverDetailComponent implements OnInit {
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

  goToStockDeliverCreatePage() {
    let changePage: ChangePage = new ChangePage('stockDeliverCreate', null);
    this.currentPageEmit.emit(changePage);
  }
}
