import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { CollectionsService } from 'src/app/services/collections.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddItemComponent } from 'src/app/organism/add-item/add-item.component';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage {
  // message = 'This modal example uses the modalController to present and dismiss modals.';

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
    let collectionId = localStorage.getItem('collectionId')
    if(collectionId){
      await this.getCollection(collectionId)
    }
    // this.getItem()
  }

  // ngOnInit() {

  // }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddItemComponent,
    });
    modal.present();
    this.popOverController.dismiss()
    const { data, role } = await modal.onWillDismiss();

    // if (role === 'confirm') {
    //   this.message = `Hello, ${data}!`;
    // }
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
