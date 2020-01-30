import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {StockMovingService} from "../../../../services/stock-moving.service";
import {StockItem} from "../../../../model/stock-item.model";
import {IngredientService} from "../../../../services/Ingredient.service";
import {Ingredient} from "../../../../model/ingredient.model";
import {StockMovingRequest} from "../../../../model/post/stock-moving-request.model";
import {TokenStorageService} from "../../../../auth/token-storage.service";
import {StockItemRequest} from "../../../../model/post/stock-item-request.model";
import {AlertDialogComponent} from "../../../../util/alert/alert-dialog.component";
import {SimpleModalService} from "ngx-simple-modal";
import {ChangePage} from "../../../../model/change-page.model";

@Component({
  selector: 'app-stock-received-form',
  templateUrl: './stock-received-form.component.html',
  styleUrls: ['./stock-received-form.component.css']
})
export class StockReceivedFormComponent implements OnInit {

  @Output() currentPageEmit = new EventEmitter();

  stockItemMap: Map<number, StockItem> = new Map<number, StockItem>();
  ingredients: Array<Ingredient> = new Array<Ingredient>();
  currentQuantityInStock: string = null;
  form: any = {};

  totalPrice = 0;

  constructor(private route: ActivatedRoute,
              private tokenStorage: TokenStorageService,
              private toastr: ToastrService,
              private SimpleModalService: SimpleModalService,
              private spinnerService: Ng4LoadingSpinnerService,
              private ingredientService: IngredientService,
              private stockMovingService: StockMovingService) {
  }

  ngOnInit() {
    this.getIngredients();
  }

  getIngredients() {
    this.ingredientService.getAllIngredients().subscribe(
      data => {
        this.ingredients = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  changeIngredient() {
    let ingredient = this.form.ingredient;
    if (ingredient == null) {
      this.currentQuantityInStock = null;
    } else {
      this.currentQuantityInStock = ingredient.currentQuantity + ' ' + ingredient.unit;
    }
  }

  onAddStockItem() {
    let ingredient= this.form.ingredient;
    let quantity= this.form.quantity;
    let pricePerUnit= this.form.pricePerUnit;
    let si = new StockItem(null, ingredient, quantity, pricePerUnit);
    // console.log(sir);
   this.addStockItemToMap(si);
  }

  onSubmit() {
    if (this.stockItemMap.size == 0) {
      this.toastr.error('No items selected', 'Warning');
    } else {
      let createdBy = 'admin';
      let approvedBy = null;
      let stockItems:Array<StockItemRequest> = new Array<StockItemRequest>();
      this.stockItemMap.forEach((value, key) => {
        let sir: StockItemRequest = new StockItemRequest(value.ingredient.id, value.quantity, value.pricePerUnit);
        stockItems.push(sir);
      });

      let smr: StockMovingRequest = new StockMovingRequest(createdBy, approvedBy, stockItems, this.totalPrice);
      this.spinnerService.show();
      this.stockMovingService.createStockReceive(smr).subscribe(
        data => {
          this.spinnerService.hide();
          if (data.success) {
            this.SimpleModalService.addModal(AlertDialogComponent, {
              title: 'Information', message: 'Successfully create stock received record, go back to manage page'}).subscribe((isConfirmed) => {
              this.goToStockReceivePage();
            });
          } else {
            this.toastr.error(data.message, 'Error');
          }
        },
        error => {
          this.spinnerService.hide();
          console.log(error);
          this.toastr.error('Failed to create stock received', 'Error');
        }
      );
    }
  }

  addStockItemToMap(stockItem: StockItem) {
    if (this.stockItemMap.get(stockItem.ingredient.id) == undefined || this.stockItemMap.get(stockItem.ingredient.id) == null) {
      this.stockItemMap.set(stockItem.ingredient.id, stockItem);
      this.calculateTotalPrice();
    } else {
      this.toastr.error("The selected ingredient has already been in the stock cart");
    }
  }

  removeStockItemFromMap(ingredientId: number) {
    this.stockItemMap.delete(ingredientId);
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    let row = 0;
    this.stockItemMap.forEach((value, key) => {
      row += value.pricePerUnit * value.quantity;
    });
    this.totalPrice = row;
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

}
