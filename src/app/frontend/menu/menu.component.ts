import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DishService} from "../../services/dish.service";
import {Dish} from "../../model/dish.model";
import {configuration} from "../../model/configuration.model";
import {CartStorageService} from "../../services/cart-storage.service";
import {ToastrService} from "ngx-toastr";
import {ChangePage} from "../../model/change-page.model";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  dishes: Array<Dish> = new Array<Dish>();
  currentPage: number;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  private configuration = configuration;

  constructor(private dishService: DishService,
              private toastr: ToastrService,
              private cartStorage: CartStorageService) {

  }

  ngOnInit() {
    this.search(1);
  }

  search(page: number) {
    this.dishService.getDishes(page, configuration.pageSizeGrid).subscribe(
      data => {
        this.dishes = data.data;
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

  addItemToCart(dish: Dish) {
    let added = this.cartStorage.addItem(dish, 1);
    if (added) {
      this.toastr.success("Added to cart successfully");
    }
  }

  changePage(changePage: ChangePage) {
    this.goToPage(changePage);
  }
  goToPage(changePage: ChangePage) {
    this.currentPageEmit.emit(changePage);
  }

  goToDishDetailPage(id: number) {
    let changePage: ChangePage = new ChangePage('dishDetail', id);
    this.currentPageEmit.emit(changePage);
  }

}
