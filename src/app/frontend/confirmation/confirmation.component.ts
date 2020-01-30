import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  orderId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let oid = params['orderId'];

      if (oid == null || oid == undefined) {
        this.orderId = 'Incorrect order Id';
      } else {
        this.orderId = params['orderId'];
      }
    });
  }

}
