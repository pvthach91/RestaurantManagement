import { Component, OnInit } from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";

@Component({
  selector: 'app-info-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent extends SimpleModalComponent<AlertModel, null> implements OnInit, AlertModel  {

  title: string;
  message: string;
  constructor() {
    super();
  }

  ngOnInit() {
  }

}

export interface AlertModel {
  title: string;
  message: string;
}
