export class IngredientCriteriaSearch {
  name: string;
  quantityFrom: number;
  quantityTo: number;
  currentPage: number;
  pageSize: number;


  constructor(name: string, quantityFrom: number, quantityTo: number, currentPage: number, pageSize: number) {
    this.name = name;
    this.quantityFrom = quantityFrom;
    this.quantityTo = quantityTo;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }
}
