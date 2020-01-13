import { Component, OnInit } from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";

@Component({
  selector: 'app-prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.css']
})
export class PromptDialogComponent extends SimpleModalComponent<PromptModel, string> implements OnInit, PromptModel {

  title: string;
  question: string;
  message: string = '';
  constructor() {
    super();
  }
  apply() {
    this.result = this.message;
    this.close();
  }

  ngOnInit() {
  }

}

export interface PromptModel {
  title:string;
  question:string;
}
