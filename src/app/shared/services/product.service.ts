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

  // Get products category
  getProductsCat() {
    return this.http.get(this.url + "/get_category");
  }

  // Search products
  searchProduct(query: any) {
    return this.http.get(this.url + "/search_products/" + query)
  }

  // Add to cart
  addToCart(qty: any) {
    return this.http.post(this.url + "/add_to_cart", qty);
  }

  // Remove from cart
  removeFromCart(cartId: any) {
    return this.http.post(this.url + '/remove_cart', cartId)
  }

  // View Cart
  viewCart() {
    return this.http.get(this.url + "/get_cart");
  }

  // Apply promocode
  applyPromo(promo: any) {
    return this.http.post(this.url + "/coupon", promo);
  }

  // Place order
  placeOrder(cart: any) {
    return this.http.post(this.url + "/order", cart);
  }

}
