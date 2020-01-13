import {Dish} from "./dish.model";

export class DishDetail {
  dto: Dish;
  relatedDishes: Array<Dish>;


  constructor(dto: Dish, relatedDishes: Array<Dish>) {
    this.dto = dto;
    this.relatedDishes = relatedDishes;
  }
}


// export const initialDish: Dish = {
//   id: 1,
//   name: '',
// };
