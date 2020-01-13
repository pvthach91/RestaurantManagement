import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ChangePage} from "../../model/change-page.model";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changePage(changePage: ChangePage) {
    this.goToPage(changePage);
  }
  goToPage(changePage: ChangePage) {
    this.currentPageEmit.emit(changePage);
  }
}
