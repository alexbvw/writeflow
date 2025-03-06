import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  asset: any = {};
  assetId: any = '';
  assets: any = [];
  assetLoading = true;
  assetsLoading = true;
  serviceUrl = environment.webflow_service_url;
  headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  constructor(
    private http: HttpClient
  ) { }

  async setAuthHeader(token: string) {
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
  }

  async UploadAsset(siteId: any, file: File) {

    await this.setAuthHeader(localStorage.getItem('token') || '');

    let url = `${this.serviceUrl}sites/${siteId}/assets`;
    
    let form = new FormData();
    form.append('file', file, file.name);
    const customHeaders = this.headers.delete('Content-Type');
    return firstValueFrom(this.http.request(
      'POST',
      url,
      { headers: customHeaders, body: form }
    ));

  }

  // Get Webflow assets
  async getAssets(collectionId:any) {
    await this.setAuthHeader(localStorage.getItem('token') || '');
    let url = `${this.serviceUrl}assets?collectionId=${collectionId}`;
    return firstValueFrom(this.http.request(
      'GET',
      url,
      { headers: this.headers }
    ));
  }

  // Get a specific Webflow Asset by Asset ID
  async getAsset(collectionId:any,assetId: any) {
    await this.setAuthHeader(localStorage.getItem('token') || '');
    let url = `${this.serviceUrl}collections/${collectionId}/assets/${assetId}`;
    return firstValueFrom(this.http.request(
      'GET',
      url,
      { headers: this.headers }
    ));
  }

  async updateCollectionAssets(collectionId: any, data: any) {
    await this.setAuthHeader(localStorage.getItem('token') || '');
    let url = `${this.serviceUrl}collection/${collectionId}/assets`;
    return firstValueFrom(this.http.request(
      'PUT',
      url,
      { headers: this.headers, body: data }
   ));
  }

}
// https://localhost:444/v1/webflow/collections/669b72d74bb30c4fec719e3e/assets
