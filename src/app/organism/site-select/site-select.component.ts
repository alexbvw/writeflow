import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { SitesService } from 'src/app/services/sites.service';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-site-select',
  templateUrl: './site-select.component.html',
  styleUrls: ['./site-select.component.scss'],
})
export class SiteSelectComponent  implements OnInit {

  constructor(
    public sitesService: SitesService,
    public itemsService: ItemsService,
    public collectionsService: CollectionsService,
  ) { }

  async ngOnInit() {
    await this.getSites();
  }
  compareWithFn(o1: any, o2: any) {
    return o1 && o2 ? o1 === o2 : o1 === o2;
  }

  async checkSelectedSite(sites: any) {
    const siteId = localStorage.getItem('siteId');
    if (siteId) {
      const selectedSite = sites.find((site: any) => site.id === siteId);
      if (selectedSite) {
        this.sitesService.selectedSite = selectedSite;
        console.log(this.sitesService.selectedSite);
      }
    }
  }
  async getSites(){
    this.sitesService.sitesLoading = true
    await this.sitesService.getSites()
    .then(async (res: any) => {
      await this.checkSelectedSite(res?.sites)
      this.sitesService.sites = await res?.sites;
      this.sitesService.sitesLoading = false;
    })
    .catch((err: any) => {
      console.log(err)
    })
  }

async changeSite(event: any) {
  const selectedSiteId = event?.detail?.value;
  if (selectedSiteId) {
    const selectedSite = this.sitesService.sites.find((site: any) => site.id === selectedSiteId);
    if (selectedSite) {
      this.sitesService.selectedSite = selectedSite;
      localStorage.setItem('siteId', selectedSiteId);
      await this.getCollections(selectedSiteId);
      console.log(this.sitesService.selectedSite);
    }
  }
}

  async getCollections(siteId:any){
    await this.collectionsService.getCollections(siteId)
    .then((res: any) => {
      console.log(res?.collections)
      this.collectionsService.collections = res?.collections;
      // this.getItems(res?.collections[0]?.id)
    })
    .catch((err: any) => {
      console.log(err)
    })
  }

  async getItems(collectionId:any){
    await this.itemsService.getItems(collectionId)
    .then((res: any) => {
      console.log(res?.items)
      this.itemsService.items = res?.items;
    })
    .catch((err: any) => {
      console.log(err)
    })
  }

}
