import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DishService} from "../../services/dish.service";
import {Dish} from "../../model/dish.model";
import {configuration} from "../../model/configuration.model";
import {CartStorageService} from "../../services/cart-storage.service";
import {ToastrService} from "ngx-toastr";
import {ChangePage} from "../../model/change-page.model";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Output() currentPageEmit = new EventEmitter();


  constructor(private dishService: DishService,
              private toastr: ToastrService,
              private cartStorage: CartStorageService) {

  }

  ngOnInit() {




    var boxEl = document.querySelector('a-box');
    // boxEl.setAttribute('width', 5);
    // boxEl.setAttribute('color', 'red');

    boxEl.addEventListener('click', (e) => {
      boxEl.setAttribute('color', 'blue');
      // console.log(e.detail.intersection.point)
      // console.log(e.detail);

    });
    // boxEl.addEventListener('click', function () {
    //   // If we are using the cursor component.
    //   boxEl.setAttribute('color', 'blue');
    // });
    // boxEl.emit('some-event');
    // boxEl.removeAttribute('color');
    // boxEl.querySelectorAll('a-sphere');
    //
    // var sphereEl = document.createElement('a-sphere');
    // sphereEl.setAttribute('radius', 1);
    // document.querySelector('a-scene').appendChild(sphereEl);
    // sphereEl.addEventListener('loaded', function () {
    //   console.log('sphere attached');
    // });

  }



}
