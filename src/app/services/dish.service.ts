import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {Dish} from "../model/dish.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getDishes(currentPage: number, pageSize: number): Observable<Page> {
    const url = configuration.host + '/api/guest/dishes/' + currentPage + '/' + pageSize;
    return this.http.get<Page>(url, httpOptions);
  }

  getDish(dishId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/guest/dish/' + dishId;
    return this.http.get<ApiResponse>(url);
  }

  create(dish: Dish): Observable<Dish> {
    const url = configuration.host + '/api/dish/create';
    return this.http.post<Dish>(url, dish, httpOptions);
  }

  deleteDish(dishId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/dish/delete/' + dishId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

}
