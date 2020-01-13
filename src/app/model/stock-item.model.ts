import {Ingredient} from "./ingredient.model";

export class StockItem {
  id: number;
  ingredient: Ingredient;
  quantity: number;
  pricePerUnit: number;


  constructor(id: number, ingredient: Ingredient, quantity: number, pricePerUnit: number) {
    this.id = id;
    this.ingredient = ingredient;
    this.quantity = quantity;
    this.pricePerUnit = pricePerUnit;
  }
}
