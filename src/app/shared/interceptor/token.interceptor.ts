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
  loggedUser: any = localStorage.getItem("user");
  private url = environment.url;

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.token = this.authService.getLoggedUser().token;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedReq = request.clone({ 
      headers: request.headers.set('Authorization', `${this.token}`),
    });
    return next.handle(modifiedReq);
  }
}
