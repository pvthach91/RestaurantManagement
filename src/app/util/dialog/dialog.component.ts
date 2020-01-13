import { Component, OnInit } from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {PromptModel} from "../prompt/prompt-dialog/prompt-dialog.component";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent extends SimpleModalComponent<PromptModel, string> implements OnInit, PromptModel {

  title: string;
  question: string;
  message: string = '';
  constructor() {super(); }

  ngOnInit() {
  }

}
export interface PromptModel {
  title:string;
  question:string;
}
