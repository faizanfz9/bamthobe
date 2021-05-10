import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private url = environment.url;

  constructor(private http: HttpClient) { }

  bannerSlides() {
    return this.http.get(this.url + '/get_sliders');
  }

  specialCat() {
    return this.http.get(this.url + '/get_banner');
  }

  contactRequest(request: any) {
    return this.http.post(this.url + "/contact_us", request);
  }
}
