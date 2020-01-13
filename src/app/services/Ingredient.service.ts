import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {IngredientCriteriaSearch} from "../model/ingredient-criteria-search.model";
import {Ingredient} from "../model/ingredient.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getIngredients(criteriaSearch: IngredientCriteriaSearch): Observable<Page> {
    const url = configuration.host + '/api/ingredients/';
    return this.http.post<Page>(url, criteriaSearch, httpOptions);
  }

  getAllIngredients(): Observable<Array<Ingredient>> {
    const url = configuration.host + '/api/allIngredients/';
    return this.http.get<Array<Ingredient>>(url, httpOptions);
  }


  create(ingredient: Ingredient): Observable<ApiResponse> {
    const url = configuration.host + '/api/ingredient/create';
    return this.http.post<ApiResponse>(url, ingredient, httpOptions);
  }

  deleteIngredient(ingredientId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/ingredient/delete/' + ingredientId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

}
