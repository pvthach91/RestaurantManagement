export class StockItemRequest {
  ingredientId: number;
  quantity: number;
  pricePerUnit: number;


  constructor(ingredientId: number, quantity: number, pricePerUnit: number) {
    this.ingredientId = ingredientId;
    this.quantity = quantity;
    this.pricePerUnit = pricePerUnit;
  }
}
