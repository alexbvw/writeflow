import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SitesService } from 'src/app/services/sites.service';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-pulse',
  templateUrl: './pulse.page.html',
  styleUrls: ['./pulse.page.scss'],
})
export class PulsePage {

  constructor(
    private router: Router, 
    public sitesService: SitesService,
    public collectionsService: CollectionsService) { }
  // ngOnInit() {

  // }
  async ionViewWillEnter() {
    this.sitesService.siteId = localStorage.getItem('siteId')
    await this.getCollectionsCount()
  }

  async getCollectionsCount() {
    this.collectionsService.collectionsLoading = true
    await this.collectionsService.getCollections(this.sitesService.siteId)
    .then((res: any) => {
      console.log(res)
      this.collectionsService.collections = res?.collections
      this.collectionsService.collectionsLoading = false
    })
    .catch((err: any) => {
      console.log(err)
    })
  }
}
