import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.url;

  constructor(private http: HttpClient) { }

  // Get all products
  getProducts(catId: any) {
    return this.http.get(this.url + "/products/" + catId);
  }

  // Get all by Id
  getProductById(id: any) {
    return this.http.get(this.url + "/products_details/" + id);
  }
}
