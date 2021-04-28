import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  headers: any;
  loggedUser: any = localStorage.getItem("user");
  private url = environment.url;

  constructor(private http: HttpClient, private authService: AuthService) { 
  }

   // Get logged User
  getLoggedUser() {
    return JSON.parse(this.loggedUser);
  }

  // Get user profile
  getUserProfile() {
    return this.http.get(this.url + '/get_profile');
  }

  // Update user
  updateUser() {
    this.getUserProfile().subscribe((res: any) => {
      this.authService.user.next({isLogin: true, data: res.data});
      localStorage.setItem('user', JSON.stringify(res.data));
    })
  }

  // Update profile
  updateProfile(user: any) {
    return this.http.post(this.url + '/update_profile', user);
  }

  // Get user address
  getAddress() {
    return this.http.get(this.url + '/get_address');
  }

  // Add new address
  addAddress(address: any) {
    return this.http.post(this.url + '/add_address', address);
  }

  // Update address
  updateAddress(address: any) {
    return this.http.post(this.url + '/update_address', address);
  }

  // Gift card list
  giftCardList() {
    return this.http.get(this.url + '/gifts');
  }

  // Gift card detail
  giftCardDetail(id: any) {
    return this.http.get(this.url + "/gift_description/" + id)
  }

  // Create gift card
  createGiftCard(giftCard: any) {
    return this.http.post(this.url + "/gift_create", giftCard);
  }

  // Get offers
  getOffers() {
    return this.http.get(this.url + "/offers");
  }

  // Get user orders
  getOrders() {
    return this.http.get(this.url + "/order_history");
  }
}
 