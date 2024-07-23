import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage {
  fields:any = []
  constructor(public itemsService: ItemsService) { }

  // ngOnInit() {
  // }

  ionViewWillEnter() {
    this.itemsService.itemLoading = true
    let collectionId = localStorage.getItem('collectionId')
    let itemId = localStorage.getItem('itemId')
    if(collectionId && itemId){
      this.getItem(collectionId,itemId)
    }

  }

  async getItem(collectionId:any,itemId: any){
    await this.itemsService.getItem(collectionId,itemId)
    .then(async(res: any) => {
      this.itemsService.item = await res;
      if(localStorage.getItem('activeFields')){
        this.fields = JSON.parse(localStorage.getItem('activeFields') || '')
        console.log(JSON.parse(localStorage.getItem('activeFields') || ''))
      }
      for(let [fieldIndex, field] of this.fields.entries()){
        if(this.itemsService.item?.fieldData?.[field.slug]){
          this.fields[fieldIndex].data = this.itemsService.item?.fieldData?.[field.slug]
        }
      }
      console.log(this.fields)
      this.itemsService.itemLoading = false
    })
    .catch((err: any) => {
      console.log(err)
    })
   
  }

}
