import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.url;

  constructor(private http: HttpClient) { }

  getThobes() {
    return this.http.get(this.url + "/model_thobe");
  }

  getShawls() {
    return this.http.get(this.url + "/shawls");
  }

  getAttars() {
    return this.http.get(this.url + "/attars");
  }

  getCufflinks() {
    return this.http.get(this.url + "/cufflinks");
  }
}
