
export class Ingredient {
  id: number;
  name: string;
  unit: string;
  currentQuantity: number;


  constructor(id: number, name: string, unit: string, currentQuantity: number) {
    this.id = id;
    this.name = name;
    this.unit = unit;
    this.currentQuantity = currentQuantity;
  }
}
