import {Component, OnInit} from '@angular/core';
import {DishService} from "../../services/dish.service";
import {DishDetail} from "../../model/dish-detail.model";
import {configuration} from "../../model/configuration.model";
import {Dish} from "../../model/dish.model";
import {CartStorageService} from "../../services/cart-storage.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  id: number;

  dishDetail : DishDetail;
  currentImage: string;
  firstImage: string;
  secondImage: string;
  thirdImage: string;
  private configuration = configuration;

  quantity: number = 1;

  constructor(private route: ActivatedRoute,
              private dishService: DishService,
              private toastr: ToastrService,
              private cartStorage: CartStorageService) {

  }

  ngOnInit() {
    this.getDishDetail();
  }

  getDishDetail() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == null || this.id == undefined) {
        // Load error page
      } else {
        // Load detail page
        this.dishService.getDish(this.id).subscribe(
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
    });
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

}
