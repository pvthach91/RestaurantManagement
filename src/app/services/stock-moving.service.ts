import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {StockMovingCriteriaSearch} from "../model/stock-moving-criteria-search.model";
import {StockMovingRequest} from "../model/post/stock-moving-request.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StockMovingService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getStockReceives(search : StockMovingCriteriaSearch): Observable<Page> {
    const url = configuration.host + '/api/stockReceives';
    return this.http.post<Page>(url, search, httpOptions);
  }

  getStockDelivers(search : StockMovingCriteriaSearch): Observable<Page> {
    const url = configuration.host + '/api/stockDelivers';
    return this.http.post<Page>(url, search, httpOptions);
  }

  getStock(stockId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/stock/' + stockId;
    return this.http.get<ApiResponse>(url);
  }

  getByStockRef(stockRef: string): Observable<ApiResponse> {
    const url = configuration.host + '/api/stock/stockRef/' + stockRef;
    console.log(url);
    return this.http.get<ApiResponse>(url);
  }

  createStockReceive(stock: StockMovingRequest): Observable<ApiResponse> {
    const url = configuration.host + '/api/stock/createStockReceive';
    return this.http.post<ApiResponse>(url, stock, httpOptions);
  }

  createStockDeliver(stock: StockMovingRequest): Observable<ApiResponse> {
    const url = configuration.host + '/api/stock/createStockDeliver';
    return this.http.post<ApiResponse>(url, stock, httpOptions);
  }

  deleteStock(stockId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/stock/delete/' + stockId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

  approveStock(stockId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/stock/approveInStock/' + stockId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

  approveStockFromAccounting(stockId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/stock/approveInAccounting/' + stockId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

  cancel(stockId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/stock/cancel/' + stockId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }


}
