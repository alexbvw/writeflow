import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  items: any = [];
  itemsLoading = true;
  serviceUrl = environment.webflow_service_url;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(
    private http: HttpClient
  ) { }

  async setAuthHeader(token: string) {
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
  }

  // Get Webflow items
  async getItems(collectionId:any) {
    await this.setAuthHeader(localStorage.getItem('token') || '');
    let url = `${this.serviceUrl}items?collectionId=${collectionId}`;
    return firstValueFrom(this.http.request(
      'GET',
      url,
      { headers: this.headers }
    ));
  }

  // Get a specific Webflow Item by Item ID
  async getItem(collectionId:any,itemId: any) {
    await this.setAuthHeader(localStorage.getItem('token') || '');
    let url = `${this.serviceUrl}/collections/${collectionId}/items/${itemId}`;
    return firstValueFrom(this.http.request(
      'GET',
      url,
      { headers: this.headers }
    ));
  }
}
