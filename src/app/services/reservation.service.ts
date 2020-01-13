import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {ReservationCriteriaSearch} from "../model/reservation-criteria-search.model";
import {ReservationRequest} from "../model/post/reservation-request.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getReservations(search : ReservationCriteriaSearch): Observable<Page> {
    const url = configuration.host + '/api/reservations';
    return this.http.post<Page>(url, search, httpOptions);
  }

  getReservation(reservationId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/reservation/' + reservationId;
    return this.http.get<ApiResponse>(url);
  }


  create(order: ReservationRequest): Observable<ApiResponse> {
    const url = configuration.host + '/api/guest/reservation/create';
    return this.http.post<ApiResponse>(url, order, httpOptions);
  }

  deleteReservation(reservationId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/reservation/delete/' + reservationId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

  finish(reservationId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/reservation/finish/' + reservationId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

  approve(reservationId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/reservation/approve/' + reservationId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

  cancel(reservationId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/reservation/cancel/' + reservationId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

}
