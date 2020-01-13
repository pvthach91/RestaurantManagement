import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StockItem} from "../../../../model/stock-item.model";
import {Ingredient} from "../../../../model/ingredient.model";
import {ActivatedRoute} from "@angular/router";
import {TokenStorageService} from "../../../../auth/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {SimpleModalService} from "ngx-simple-modal";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {IngredientService} from "../../../../services/Ingredient.service";
import {StockMovingService} from "../../../../services/stock-moving.service";
import {StockItemRequest} from "../../../../model/post/stock-item-request.model";
import {StockMovingRequest} from "../../../../model/post/stock-moving-request.model";
import {AlertDialogComponent} from "../../../../util/alert/alert-dialog.component";
import {ChangePage} from "../../../../model/change-page.model";

@Component({
  selector: 'app-stock-deliver-form',
  templateUrl: './stock-deliver-form.component.html',
  styleUrls: ['./stock-deliver-form.component.css']
})
export class StockDeliverFormComponent implements OnInit {

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
    if (ingredient.currentQuantity == 0) {
      this.toastr.error('The ingredient is out of stock, please buy first');
      return;
    }
    let quantity= this.form.quantity;
    if (quantity > ingredient.currentQuantity) {
      this.toastr.error('The quantity you want to deliver is greater than current quantity');
      return;
    }
    let si = new StockItem(null, ingredient, quantity, 0);
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
      this.stockMovingService.createStockDeliver(smr).subscribe(
        data => {
          this.spinnerService.hide();
          if (data.success) {
            this.SimpleModalService.addModal(AlertDialogComponent, {
              title: 'Information', message: 'Successfully create stock deliver record, go back to manage page'}).subscribe((isConfirmed) => {
              this.goToStockDeliverPage();
            });
          } else {
            this.toastr.error(data.message, 'Error');
          }
        },
        error => {
          this.spinnerService.hide();
          console.log(error);
          this.toastr.error('Failed to create stock deliver', 'Error');
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
