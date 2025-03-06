import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
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
    public itemsService: ItemsService,
    public collectionsService: CollectionsService) { }
  // ngOnInit() {

  // }
  async ionViewWillEnter() {
    this.sitesService.siteId = localStorage.getItem('siteId')
    await this.getSiteId()
  }

  async handleRefresh(event: any) {
    await this.getSiteId()
    event.target.complete();
  }

  async getSiteId(){
    let siteId = localStorage.getItem('siteId')
    if(siteId){
      await this.getCollections(siteId)
    }
  }

  async getCollections(siteId:any){
    this.collectionsService.collectionsLoading = true;
    await this.collectionsService.getCollections(siteId)
    .then((res: any) => {
      this.collectionsService.collections = res?.collections;
      for(let [collectionIndex, collection] of this.collectionsService.collections.entries()){
        this.getItems(collection?.id)
      }
      this.collectionsService.collectionsLoading = false;
      console.log(res?.collections)
    })
    .catch((err: any) => {
      console.log(err)
    })
  }

  async getItems(collectionId:any){
    await this.itemsService.getItems(collectionId)
    .then((res: any) => {
      this.itemsService.items = res?.items;
      for(let [collectionIndex, collection] of this.collectionsService.collections.entries()){
        if(collection?.id === collectionId){
          this.collectionsService.collections[collectionIndex].items = this.itemsService.items
        }
      }
    })
    .catch((err: any) => {
      console.log(err)
    })
  }

  navCollection(collection:any){
    console.log(collection)
    localStorage.setItem('collectionId', collection.id)
    // localStorage.setItem('activeFields', JSON.stringify(collection.fields))
    this.router.navigate([`/collection/${collection.slug}`]);
  }
}
