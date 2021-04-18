import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: any;
  private url = environment.url;

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.token = this.authService.getLoggedUser() ? this.authService.getLoggedUser().token : null;
    this.authService.user.subscribe(res => {
      if(res.data) {
        this.token = res.data.token;
      }
   });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedReq = request.clone({ 
      headers: request.headers.set('Authorization', `${this.token}`),
    });
    return next.handle(modifiedReq);
  }
}
