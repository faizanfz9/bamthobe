import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private url = environment.url;

  constructor(private http: HttpClient) { }

  getBannerSlides() {
    return this.http.get(this.url + '/get_sliders');
  }
}
