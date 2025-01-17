import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  collection: any = {};
  collections: any = [];
  collectionLoading = true;
  collectionsLoading = true;
  collectionId: any;
  serviceUrl = environment.webflow_service_url;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(
    private http: HttpClient
  ) { }

  async setAuthHeader(token: string) {
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
  }

  // Get Webflow collections
  async getCollections(siteId:any) {
    await this.setAuthHeader(localStorage.getItem('token') || '');
    let url = `${this.serviceUrl}collections?siteId=${siteId}`;
    return firstValueFrom(this.http.request(
      'GET',
      url,
      { headers: this.headers }
    ));
  }

  // Get a specific Webflow Collection by Collection ID
  async getCollection(collectionId: string) {
    await this.setAuthHeader(localStorage.getItem('token') || '');
    let url = `${this.serviceUrl}collection/${collectionId}`;
    return firstValueFrom(this.http.request(
      'GET',
      url,
      { headers: this.headers }
    ));
  }
}
