import { Component, OnInit } from '@angular/core';
import {ChangePage} from "../../../model/change-page.model";
import {TokenStorageService} from "../../../auth/token-storage.service";

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.css']
})
export class StockManagementComponent implements OnInit {

  currentPage;
  id = 1;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if(!this.tokenStorage.hasStockRole()) {
      window.location.href = 'management/403';
      return;
    }
    this.currentPage = 'ingredient';
  }

  changePage(changePage: ChangePage) {
    console.log(changePage);
    this.id = changePage.id;
    this.currentPage = changePage.page;
  }

  isIngredientPage(): boolean{
    return this.currentPage == 'ingredient' ? true : false;
  }

  isStockReceivePage(): boolean{
    return this.currentPage == 'stockReceive' ? true : false;
  }

  isStockReceiveDetailPage(): boolean{
    return this.currentPage == 'stockReceiveDetail' ? true : false;
  }

  isStockReceiveCreatePage(): boolean{
    return this.currentPage == 'stockReceiveCreate' ? true : false;
  }

  isStockDeliverPage(): boolean{
    return this.currentPage == 'stockDeliver' ? true : false;
  }

  isStockDeliverDetailPage(): boolean{
    return this.currentPage == 'stockDeliverDetail' ? true : false;
  }

  isStockDeliverCreatePage(): boolean{
    return this.currentPage == 'stockDeliverCreate' ? true : false;
  }

}
