import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SimpleModalService} from "ngx-simple-modal";
import {DishFormComponent} from "./dish-form/dish-form.component";
import {Dish} from "../../../model/dish.model";
import {configuration} from "../../../model/configuration.model";
import {DishService} from "../../../services/dish.service";
import {ConfirmDialogComponent} from "../../../util/confirm/confirm-dialog.component";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ChangePage} from "../../../model/change-page.model";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  isNew = true;

  dishes: Array<Dish> = new Array<Dish>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  private configuration = configuration;

  constructor(private dishService: DishService,
              private SimpleModalService: SimpleModalService,
              private toastr: ToastrService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.search(1);
  }

  showDialog(isNew: boolean, dish: Dish) {
    this.SimpleModalService.addModal(DishFormComponent, {
      isNewAction: isNew,
      dish: dish})
      .subscribe((message) => {
        if (message != undefined && message != null && message == "refresh") {
          this.search(this.currentPage);
        }
      });
  }

  showDeleteDialog(dishId: number) {
    this.SimpleModalService.addModal(ConfirmDialogComponent, {
      title: 'Confirmation',
      message: 'Are you sure you want to delete the dish?'})
      .subscribe((isConfirmed) => {
        if (isConfirmed != undefined && isConfirmed != null && isConfirmed == true) {
         this.deleteDish(dishId);
        }
      });
  }

  deleteDish (dishId: number) {
    this.dishService.deleteDish(dishId).subscribe(
      data => {
        if (data.success == true) {
          this.search(1);
          this.toastr.success('Dish has been deleted', 'Info');
        } else {
          this.toastr.error('Failed to delete dish', 'Error');
        }
      },
      error => {
        console.log(error);
      }
    );
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

  goToOrderPage() {
    let changePage: ChangePage = new ChangePage('order', null);
    this.currentPageEmit.emit(changePage);
  }

  goToReservationPage() {
    let changePage: ChangePage = new ChangePage('reservation', null);
    this.currentPageEmit.emit(changePage);
  }
}
