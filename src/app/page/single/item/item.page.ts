import { Editor } from 'ngx-editor';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ItemsService } from 'src/app/services/items.service';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage {
  // editor: Editor = new Editor();
  isPublished = false
  editors: Editor[] = []  
  fields:any = []
  
  public editorContent: string = 'My initial content';
  constructor(
    public itemsService: ItemsService,
    public collectionsService: CollectionsService,
    private toastController: ToastController
  ) { }
  html:any
  // ngOnInit() {
  // }

  editorChange(event: any, fieldUpdate: any){
    // console.log(event,fieldUpdate);
    for(let [fieldIndex, field] of this.fields.entries()){
      if(field.slug === fieldUpdate.slug){
        this.fields[fieldIndex].data = event
      }
    }
  }

  async textEditorChange(event: any, fieldUpdate: any) {
    // console.log(event,fieldUpdate);
    let slug = event.target.value.replace(/\s/g, '-').toLowerCase();
    console.log(slug)
    console.log(this.fields)
    for (let [fieldIndex, field] of this.fields.entries()) {
      if (field.slug === 'slug') {
        field.data = slug;
        console.log(field)
        console.log(slug)
      }
    }
  }
  

  async ionViewWillEnter() {
    this.itemsService.itemLoading = true
    // this.editor = new Editor();
    let collectionId = localStorage.getItem('collectionId')
    let itemId = localStorage.getItem('itemId')
    if(collectionId && itemId){
      await this.getItem(collectionId,itemId)
      this.itemsService.itemLoading = false
    }
  }

  ionViewWillLeave() {
    this.itemsService.itemLoading = true
    for(let [editorIndex, editor] of this.editors.entries()){
      console.log(editorIndex)
      editor.destroy()
    }
  }
  async getItem(collectionId:any,itemId: any){
    await this.itemsService.getItem(collectionId,itemId)
    .then(async(res: any) => {
      this.itemsService.item = await res;
      console.log(this.itemsService.item)
      if(localStorage.getItem('activeFields')){
        this.fields = JSON.parse(localStorage.getItem('activeFields') || '')
        console.log(this.fields)
        // console.log(JSON.parse(localStorage.getItem('activeFields') || ''))
      }
       for(let [fieldIndex, field] of await this.fields.entries()){     
        if(this.itemsService.item?.fieldData?.[field.slug]){
          this.fields[fieldIndex].data = await this.itemsService.item?.fieldData?.[field.slug]
        }
        if(field.type === 'Image' && !this.itemsService.item?.fieldData?.[field.slug]){
          this.fields[fieldIndex].data = {url: 'assets/placeholder.svg'}
          // console.log(field.slug, field.type)
        } 
        if(field.type === 'RichText'){
          this.editors.push(new Editor({
            
          }))
          this.fields[fieldIndex].editorNumber =  this.editors.length - 1
          // console.log(this.editors)
        }      }
      // this.fields = this.fields.reverse()
      this.itemsService.itemLoading = false
    })
    .catch((err: any) => {
      console.log(err)
    })
  }

  async changeImage(field: any){
    console.log(field)
  }

  async setColor(newColor: any) {
    console.log('value', newColor);
    // this.linkColor = newColor;
  }

  async deleteImage(field: any){
    console.log(field)
  }

  async publishItemChanges(){
    // console.log(this.fields)
    this.collectionsService.collectionId = localStorage.getItem('collectionId')
    await this.updateCollectionItems(this.collectionsService.collectionId)
  }

  async archiveItem(itemId: any){
    console.log(itemId)
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message?: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
  
  // {
  //   "isArchived": false,
  //   "isDraft": false,
  //   "items": 
  //    [
  //      {
  //        "id": "669ab5a9104439b21645bd85",
  //        "fieldData": {
  //           "country": "Vestibulum b",
  //          "city": "Vivamus te"
  //         }
  //      }
  //     ]
  // }

  async updateCollectionItems(collectionId: any) {

    this.itemsService.itemId = localStorage.getItem('itemId')
    let updatedArray = []
    for(let [fieldIndex, field] of this.fields.entries()){
      updatedArray.push({
        [field.slug]: field.data
      })
    }
    console.log(updatedArray,collectionId)

    const mappedFields = updatedArray.reduce((acc: any, item: any) => {
      // For each item, we only expect one key
      const [ key ] = Object.keys(item); 
      acc[key] = item[key];
      return acc;
    }, {} as Record<string, any>);

    let jsonData = {
      isArchived: false,
      isDraft: false,
      items: [
         {
           "id": this.itemsService.itemId,
           "fieldData": mappedFields
         }
      ]
    }
    // console.log(jsonData)
    this.itemsService.updateCollectionItems(collectionId, jsonData)
    .then(async (res: any) => {
      // console.log(res)
      await this.getItem(this.collectionsService.collectionId,this.itemsService.itemId)
      await this.presentToast('bottom', 'Item updated successfully')
    })
    .catch((err: any) => {
      console.log(err)
    })

  }

  async unpublishItem(){
    this.itemsService.itemId = localStorage.getItem('itemId')
  }

}
