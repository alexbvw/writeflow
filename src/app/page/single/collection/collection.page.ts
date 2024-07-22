import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public itemsService: ItemsService,
    public collectionsService: CollectionsService,
  ) { }

  async ionViewWillEnter(){
    this.itemsService.itemsLoading = true
    let collectionId = localStorage.getItem('collectionId')
    if(collectionId){
      await this.getCollection(collectionId)
    }
    // this.getItem()
  }

  // ngOnInit() {

  // }

  async getCollection(collectionId:any){
    this.collectionsService.collectionLoading = true
    await this.collectionsService.getCollection(collectionId)
    .then(async (res: any) => {
      this.collectionsService.collection = await res;
      console.log(this.collectionsService.collection)
      await this.getItems(this.collectionsService.collection?.id)
    })
    .catch((err: any) => {
      console.log(err)
    })
  }

  async getItems(collectionId:any){
    await this.itemsService.getItems(collectionId)
    .then(async(res: any) => {
      this.itemsService.items = await res?.items;
      this.itemsService.itemsLoading = false
      console.log(this.itemsService.items)
    })
    .catch((err: any) => {
      console.log(err)
    })
  }


}
