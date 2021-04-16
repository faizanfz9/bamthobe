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
    // attaching token to every request
    // this.headers = this.loggedUser ? new HttpHeaders().set('Authorization', this.getLoggedUser().token): null;
    // this.authService.user.subscribe(res => {
    //   if(res.data) {
    //     this.headers = new HttpHeaders().set('Authorization', res.data.token);
    //   }
    // })
  }

   // Get logged User
  getLoggedUser() {
    return JSON.parse(this.loggedUser);
  }

  // Get user profile
  getUserProfile() {
    return this.http.get(this.url + '/get_profile');
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
}
