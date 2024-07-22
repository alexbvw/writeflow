import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SitesService {
  serviceUrl = environment.webflow_service_url;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  sites: any = [];
  sitesLoading = true;
  selectedSite: any = null;
  constructor(
    private http: HttpClient
  ) { }

  async setAuthHeader(token: string) {
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
  }

  // Get Webflow sites
  async getSites() {
    await this.setAuthHeader(localStorage.getItem('token') || '');
    let url = `${this.serviceUrl}sites`;
    return firstValueFrom(this.http.request(
      'GET',
      url,
      { headers: this.headers }
    ));
  }

  // Get a specific Webflow site by site ID
  async getSite(siteId: string) {
    let url = `${this.serviceUrl}sites/${siteId}`;
    return firstValueFrom(this.http.request(
      'GET',
      url,
      { headers: this.headers }
    ));
  }
}
