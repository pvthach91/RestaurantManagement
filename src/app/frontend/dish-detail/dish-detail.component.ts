import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DishService} from "../../services/dish.service";
import {DishDetail} from "../../model/dish-detail.model";
import {configuration} from "../../model/configuration.model";
import {Dish} from "../../model/dish.model";
import {CartStorageService} from "../../services/cart-storage.service";
import {ToastrService} from "ngx-toastr";
import {ChangePage} from "../../model/change-page.model";

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  // @Input() id: number;
  currentId: number;
  @Input() set id(id: number) {
    this.currentId = id;
    this.getDishDetail();
  }

  dishDetail : DishDetail;
  currentImage: string;
  firstImage: string;
  secondImage: string;
  thirdImage: string;
  private configuration = configuration;

  quantity: number = 1;

  constructor(private dishService: DishService,
              private toastr: ToastrService,
              private cartStorage: CartStorageService) {

  }

  ngOnInit() {
    this.getDishDetail();
  }

  get id(): number {
    return this.currentId;
  }

  getDishDetail() {
    this.dishService.getDish(this.currentId).subscribe(
      data => {
        this.dishDetail = data.data;
        let images = this.dishDetail.dto.images;
        let prefixUrl = configuration.host + '/api/guest/file/';
        if (images.length >= 1) {
          this.currentImage = prefixUrl +images[0];
          this.firstImage = prefixUrl + images[0];
        }

        if (images.length >= 2) {
          this.secondImage = prefixUrl + images[1];
        } else {
          this.secondImage = 'assets/images/no_image_available.png';
        }

        if (images.length >= 3) {
          this.thirdImage = prefixUrl + images[2];
        } else {
          this.thirdImage = 'assets/images/no_image_available.png';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  selectImage (url: string) {
    this.currentImage = url;
  }

  increaseQuantity() {
    this.quantity += 1;
  }

  decreaseQuantity() {
    if( this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  addItemToCart(dish: Dish) {
    let added = this.cartStorage.addItem(dish, this.quantity);
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

  goToHomePage() {
    let changePage: ChangePage = new ChangePage('home', null);
    this.currentPageEmit.emit(changePage);
  }

  goToDishDetailPage(id: number) {
    let changePage: ChangePage = new ChangePage('dishDetail', id);
    this.currentPageEmit.emit(changePage);
  }

}
