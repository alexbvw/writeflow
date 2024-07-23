import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.page.html',
  styleUrls: ['./collections.page.scss'],
})
export class CollectionsPage {

  constructor(
    public itemsService: ItemsService,
    public collectionsService: CollectionsService,
    private router: Router
  ) { }

  // async ngOnInit() {
  //   // this.getCollections()
  //   await this.getSiteId()
  // }

  async ionViewWillEnter(){
    await this.getSiteId()
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
    this.router.navigate([`/collection/${collection.slug}`]);
  }

}
