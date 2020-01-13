import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChangePage} from "../../model/change-page.model";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();

  @Input() id: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

  changePage(changePage: ChangePage) {
    this.goToPage(changePage);
  }
  goToPage(changePage: ChangePage) {
    this.currentPageEmit.emit(changePage);
  }

  goToHomePage() {
    let changePage: ChangePage = new ChangePage('home', null);
    this.currentPageEmit.emit(changePage);
  }

  goToTrackPage() {
    let changePage: ChangePage = new ChangePage('track', null);
    this.currentPageEmit.emit(changePage);
  }

}
