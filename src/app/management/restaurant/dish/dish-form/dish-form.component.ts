import { Component, OnInit } from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {Dish} from "../../../../model/dish.model";
import {configuration} from "../../../../model/configuration.model";
import {DishService} from "../../../../services/dish.service";
import {FileUploadService} from "../../../../services/file-upload.service";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css']
})
export class DishFormComponent extends SimpleModalComponent<DishDialogModel, string> implements OnInit, DishDialogModel {

  title: string;
  question: string;
  message: string = '';

  isNew: boolean = true;
  form: any = {};
  dish: Dish;
  isNewAction: boolean;

  selectedFile: Array<File>;
  displayImages = new Array<string>();
  displayImagesMap: Map<number, string> = new Map<number, string>();
  imagesMap: Map<number, File> = new Map<number, File>();
  oldImagesMap: Map<number, string> = new Map<number, string>();
  displayOldImages = false;

  joinImagesText: Array<string>;

  private configuration = configuration;


  constructor(private dishService: DishService,
              private fileUploadService: FileUploadService,
              private spinnerService: Ng4LoadingSpinnerService,
              private toastr: ToastrService) {
    super();
  }

  ngOnInit() {
    this.isNew = this.isNewAction;
    this.initData();
  }

  apply() {
    this.result = 'refresh';
    this.close();
  }

  onSubmit() {
    if (this.displayOldImages) {
      this.joinImagesText = this.getOldImageUrl();
      this.postDish();
    } else {
      this.getSelectedFiles();
      if (this.selectedFile.length > 0) {
        this.spinnerService.show();
        this.fileUploadService.postDishPhoto(this.selectedFile).subscribe(
          data => {
            this.joinImagesText = data;
            this.postDish();
            this.spinnerService.hide();
          },
          error => {
            this.toastr.error('Failed to upload files', 'Error');
          }
        );
      } else {
        this.spinnerService.show();
        this.postDish();
        this.spinnerService.hide();
      }
    }
  }

  postDish() {
    let dish = new Dish(
      this.isNewAction ? null : this.form.id,
      this.form.name,
      this.form.price,
      this.form.description,
      this.joinImagesText);
    this.dishService.create(dish).subscribe(
      data => {
        if (data != null) {
          this.apply();
        } else {
          this.toastr.error('Failed to create dish', 'Error');
        }
      },
      error => {
        this.toastr.error('Failed to create dish', 'Error');
      }
    );
  }

  initData() : void {
    if (!this.isNew) {
      this.form.name = this.dish.name;
      this.form.description = this.dish.description;
      this.form.price = this.dish.price;
      this.form.images = this.dish.images;

      this.displayOldImages = true;
      this.dish.images.forEach((url, i) => {
        this.oldImagesMap.set(i, url);
      });
    }
  }

  onFileChanged(event: any): void {
    let files = event.target.files;
    if (files != null && files.length > 0) {
      this.displayOldImages = false;
      this.imagesMap = new Map<number, File>();
      let index = 0;
      for (let file of files) {
        if (index >= 4) break;
        this.imagesMap.set(index, file);
        index++;
      }
      this.makeDisplayImages();
    }
  }

  makeDisplayImages(): void {
    this.displayImagesMap = new Map<number, string>();
    this.imagesMap.forEach((file, index) => {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.displayImages.push(e.target.result);
        this.displayImagesMap.set(index, e.target.result);
      }
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    this.imagesMap.delete(index);
    this.makeDisplayImages();
  }

  getSelectedFiles(): void {
    this.selectedFile = new Array<File>();
    this.imagesMap.forEach((file, index) => {
      this.selectedFile.push(file);
    });
  }

  getOldImageUrl(): Array<string> {
    let result = new Array<string>();
    this.oldImagesMap.forEach((url, index) => {
      result.push(url);
    });

    return result;
  }

  removeOldImage(index: number): void {
    this.oldImagesMap.delete(index);
  }

}

export interface DishDialogModel {
  isNewAction: boolean;
  dish: Dish;
}
