import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {ReceiptCriteriaSearch} from "../model/receipt-criteria-search.model";
import {ReceiptRequest} from "../model/post/receipt-request.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getReceipts(criteria: ReceiptCriteriaSearch): Observable<Page> {
    const url = configuration.host + '/api/receipts/';
    return this.http.post<Page>(url, criteria, httpOptions);
  }

  getReceipt(id: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/receipt/' + id;
    return this.http.get<ApiResponse>(url);
  }

  create(receipt: ReceiptRequest): Observable<ApiResponse> {
    const url = configuration.host + '/api/receipt/create';
    return this.http.post<ApiResponse>(url, receipt, httpOptions);
  }


  deleteReceipt(id: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/receipt/delete/' + id;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

}
