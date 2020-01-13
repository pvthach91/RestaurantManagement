import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {LeavingCriteriaSearch} from "../model/leaving-criteria-search.model";
import {LeavingRequest} from "../model/post/leaving-request.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LeavingService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getLeavings(criteria: LeavingCriteriaSearch): Observable<Page> {
    const url = configuration.host + '/api/leavings/';
    return this.http.post<Page>(url, criteria, httpOptions);
  }

  getLeaving(leavingId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/leaving/' + leavingId;
    return this.http.get<ApiResponse>(url);
  }

  create(leaving: LeavingRequest): Observable<ApiResponse> {
    const url = configuration.host + '/api/leaving/create';
    return this.http.post<ApiResponse>(url, leaving, httpOptions);
  }

  edit(leaving: LeavingRequest): Observable<ApiResponse> {
    const url = configuration.host + '/api/leaving/edit';
    return this.http.post<ApiResponse>(url, leaving, httpOptions);
  }

  approve(leavingId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/leaving/approve/' + leavingId;
    return this.http.post<ApiResponse>(url, httpOptions);
  }

  cancel(leavingId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/leaving/cancel/' + leavingId;
    return this.http.post<ApiResponse>(url, httpOptions);
  }

  deleteLeaving(leavingId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/leaving/delete/' + leavingId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

}
