import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {configuration} from "../model/configuration.model";
import {Observable} from "rxjs";
import {ApiResponse} from "../model/api-response.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  postAd(files: File[]): Observable<string[]> {
    const url = configuration.host + '/api/upload/uploadMotorcycles';

    const formdata = new FormData();
    for(let i =0; i < files.length; i++){
      formdata.append("files", files[i], files[i]['name']);
    }
    return this.http.post<string[]>(url, formdata);
  }

  postDishPhoto(files: File[]): Observable<string[]> {
    const url = configuration.host + '/api/upload/uploadDishPhoto';

    const formdata = new FormData();
    for(let i =0; i < files.length; i++){
      formdata.append("files", files[i], files[i]['name']);
    }
    return this.http.post<string[]>(url, formdata);
  }

  postEmployeePhoto(file: File): Observable<ApiResponse> {
    const url = configuration.host + '/api/upload/uploadEmployeePhoto';

    const formdata = new FormData();
    formdata.append("file", file, file['name']);
    return this.http.post<ApiResponse>(url, formdata);
  }
}
