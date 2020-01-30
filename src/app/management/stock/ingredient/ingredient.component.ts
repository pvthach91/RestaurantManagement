import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {configuration} from "../../../model/configuration.model";
import {SimpleModalService} from "ngx-simple-modal";
import {IngredientCriteriaSearch} from "../../../model/ingredient-criteria-search.model";
import {IngredientService} from "../../../services/Ingredient.service";
import {Ingredient} from "../../../model/ingredient.model";
import {Dish} from "../../../model/dish.model";
import {IngredientFormComponent} from "./ingredient-form/ingredient-form.component";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ChangePage} from "../../../model/change-page.model";

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  @Output() currentPageEmit = new EventEmitter();
  ingredients:Array<Ingredient> = new Array<Ingredient>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  form: any = {};

  private configuration = configuration;

  constructor(private ingredientService: IngredientService,
              private SimpleModalService: SimpleModalService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.form.quantity = 'all';
    this.search(1);
  }

  onSubmit() {
    this.search(1);
  }

  search(page: number) {
    let from;
    let to;
    let quantity: string = this.form.quantity;
    if (quantity == 'all') {
      from = null;
      to = null;
    } else {
      let arr = quantity.split('-');
      from = arr[0];
      to = arr[1];
    }

    let ics: IngredientCriteriaSearch = new IngredientCriteriaSearch(this.form.name, from, to,  page, configuration.pageSize);
    this.ingredientService.getIngredients(ics).subscribe(
      data => {
        this.ingredients = data.data;
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

  showDialog(isNew: boolean, dish: Dish) {
    this.SimpleModalService.addModal(IngredientFormComponent)
      .subscribe((message) => {
        if (message != undefined && message != null && message == "refresh") {
          this.search(this.currentPage);
        }
      });
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.href = 'auth/login';
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
    let changePage: ChangePage = new ChangePage('stockReceiveCreate',  null);
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
