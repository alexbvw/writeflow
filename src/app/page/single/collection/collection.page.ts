import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { CollectionsService } from 'src/app/services/collections.service';
import { AddItemComponent } from 'src/app/organism/add-item/add-item.component';
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
    private modalCtrl: ModalController,
    public collectionsService: CollectionsService,
    public popOverController: PopoverController
  ) { }

  async ionViewWillEnter(){
    this.itemsService.itemsLoading = true
    this.collectionsService.collectionId = localStorage.getItem('collectionId')
    if(this.collectionsService.collectionId){
      await this.getCollection(this.collectionsService.collectionId)
    }
    // this.getItem()
  }

  // ngOnInit() {

  // }

  async addItemModal() {
    const modal = await this.modalCtrl.create({
      component: AddItemComponent,
    });
    modal.present();
    modal.onDidDismiss().then((res: any) => {
      console.log(res)
      this.getCollection(this.collectionsService.collectionId)
    })
    this.popOverController.dismiss()
  }

  async getCollection(collectionId:any){
    this.collectionsService.collectionLoading = true
    await this.collectionsService.getCollection(collectionId)
    .then(async (res: any) => {
      this.collectionsService.collection = await res;
      console.log(this.collectionsService.collection)
      localStorage.setItem('activeFields', JSON.stringify(this.collectionsService.collection?.fields))
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

  navItem(item:any){
    localStorage.setItem('activeFields', JSON.stringify(this.collectionsService.collection?.fields))
    console.log(item)
    localStorage.setItem('itemId', item?.id)
    this.router.navigate([`/item/${item?.fieldData?.slug}`]);
  }

}
