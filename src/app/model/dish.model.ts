export class Dish {
  id: number;
  name: string;
  price: number;
  description: string;
  images: Array<string>;

  constructor(id: number, name: string, price: number, description: string, images: Array<string>) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.images = images;
  }
}


// export const initialDish: Dish = {
//   id: 1,
//   name: '',
// };
