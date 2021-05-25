import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomizeService {
  private url = environment.url;
  thobe = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  // Get Fabric Type
  getFabric() {
    return this.http.get(this.url + "/fabric");
  }

  // Get Collar Type
  getCollar() {
    return this.http.get(this.url + "/collar");
  }

  // Get Cuff Type
  getCuff() {
    return this.http.get(this.url + "/cuffs");
  }

  // Get Cuff Type
  getPocket() {
    return this.http.get(this.url + "/pocket");
  }

  // Get Placket Type
  getPlacket() {
    return this.http.get(this.url + "/placket");
  }

  // Get Button Type
  getButton() {
    return this.http.get(this.url + "/button");
  }

  // Add thobe to cart
  addToCart(thobe: any) {
    return this.http.post(this.url + "/thobe_cart", thobe);
  }

  // fetch branches
  getBranch() {
    return this.http.get(this.url + "/branch");
  }
}
