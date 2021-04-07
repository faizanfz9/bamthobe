import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url = environment.url;

  constructor(private http: HttpClient) { }

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

  // Get logged User
  getLoggedUser() {
    let loggedUser: any = localStorage.getItem("user");
    return JSON.parse(loggedUser);
  }

  // Check if user is authenticated
  isAuthenticated() {
    if(!this.getLoggedUser()) {
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
