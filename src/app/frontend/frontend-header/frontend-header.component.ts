import {Component, Input, OnInit} from '@angular/core';
import {CartStorageService} from "../../services/cart-storage.service";
import {OrderItem} from "../../model/order-item.model";
import {configuration} from "../../model/configuration.model";
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
  selector: 'app-frontend-header',
  templateUrl: './frontend-header.component.html',
  styleUrls: ['./frontend-header.component.css']
})
export class FrontendHeaderComponent implements OnInit {

  displayCart: boolean = false;
  shoppingCart: Array<OrderItem>;

  @Input() currentPage: string;

  private configuration = configuration;

  constructor(private cartStorage: CartStorageService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.shoppingCart = this.cartStorage.getShoppingCart();
  }

  cartClick() : void {
    this.displayCart = !this.displayCart;
    if (this.displayCart) {
      this.shoppingCart = this.cartStorage.getShoppingCart();
    }
  }

  isHomePage(): boolean {
    return 'home' == this.currentPage ? true : false;
  }

  isCareerPage(): boolean {
    return 'career' == this.currentPage  ? true : false;
  }

  isAboutUsPage(): boolean {
    return 'about-us' == this.currentPage ? true : false;
  }

  isCartPage(): boolean {
    return 'cart' == this.currentPage ? true : false;
  }

  isTrackPage(): boolean {
    return 'track' == this.currentPage ? true : false;
  }

}
