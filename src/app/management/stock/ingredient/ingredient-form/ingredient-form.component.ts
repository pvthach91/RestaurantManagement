import { Component, OnInit } from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {Dish} from "../../../../model/dish.model";
import {configuration} from "../../../../model/configuration.model";
import {DishService} from "../../../../services/dish.service";
import {FileUploadService} from "../../../../services/file-upload.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastrService} from "ngx-toastr";
import {Ingredient} from "../../../../model/ingredient.model";
import {IngredientService} from "../../../../services/Ingredient.service";

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css']
})
export class IngredientFormComponent extends SimpleModalComponent<string, string> implements OnInit {

  form: any = {};


  constructor(private ingredientService: IngredientService,
              private fileUploadService: FileUploadService,
              private spinnerService: Ng4LoadingSpinnerService,
              private toastr: ToastrService) {
    super();
  }

  ngOnInit() {
    this.form.quantity = 0;
  }

  apply() {
    this.result = 'refresh';
    this.close();
  }

  onSubmit() {
    let ingredient = new Ingredient(
      null,
      this.form.name,
      this.form.unit,
      this.form.quantity);
    this.ingredientService.create(ingredient).subscribe(
      data => {
        if (data.success) {
          this.apply();
        } else {
          this.toastr.error(data.message, 'Error');
        }
      },
      error => {
        this.toastr.error('Failed to create ingredient', 'Error');
      }
    );
  }

}

