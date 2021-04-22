import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from './user.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url = environment.url;
  user = new BehaviorSubject<any>({});

  constructor(private http: HttpClient, private handler: HttpBackend) {
    this.http = new HttpClient(this.handler);
  }

  // Register User
  register(newUser: any) {
    return this.http.post(this.url + '/register', newUser);
  }

  // Verify OTP
  verifyOtp(otpInfo: any) {
    return this.http.post(this.url + '/otp_verified', otpInfo)
  }
  
  // Login User
  login(user: any) {
    return this.http.post(this.url + '/login', user);
  }

  // Check if user is authenticated
  loggedUser: any = localStorage.getItem("user");
  getLoggedUser() {
    return JSON.parse(this.loggedUser);
  }
  
  isAuthenticated() {
    if(!localStorage.getItem("user")) {
      return false;
    }else {
      return true;
    }
  }

  // Request for new password
  forgotPwd(mobile: any) {
    return this.http.post(this.url + '/forgot_password', mobile);
  }

  // Verify OTP for change password
  resetVerifyOtp(otpInfo: any) {
    return this.http.post(this.url + '/reset_otp_verified', otpInfo)
  }

  // Reset password
  resetPwd(newPwd: any) {
    return this.http.post(this.url + '/reset_password', newPwd);
  }
}
