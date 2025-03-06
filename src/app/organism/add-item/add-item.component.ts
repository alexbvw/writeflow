import { ItemsService } from 'src/app/services/items.service';
import { SitesService } from 'src/app/services/sites.service';
import { AssetsService } from 'src/app/services/assets.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CollectionsService } from 'src/app/services/collections.service';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent {
//   name!: string;
@ViewChild("file", {static: false}) file: ElementRef | any = [];
  files: any  = [];  
  fileToUpload: File | null = null;
  activeFields: any = [];
  constructor(
    private modalService: ModalController,
    public itemsService: ItemsService,
    public assetsService: AssetsService,
    public popOverController: PopoverController,
    public sitesService: SitesService,
    private collectionService: CollectionsService,
    private toastController: ToastController
  ) {}

  ionViewWillEnter() {
    this.collectionService.collectionId = localStorage.getItem('collectionId');
    this.activeFields = JSON.parse(localStorage.getItem('activeFields') ?? '');
    for (let field of this.activeFields) {
      if(field.type === 'Image'){
        field.data = {url: 'assets/placeholder.svg'}
      }
    }
    console.log(this.activeFields);
  }

async selectImage(field: any) { 
    // console.log(field) 
    const fileUpload = this.file.nativeElement;
    fileUpload.onchange = async (res: any) => {  
      console.log(res.target.files[0]);
      this.sitesService.siteId = localStorage.getItem('siteId');
      await this.uploadAsset(this.sitesService.siteId, res.target.files[0], field);  
    };  
    fileUpload.click();  
}

async uploadAsset(siteId: any, file: any, field: any) {
  await this.assetsService.UploadAsset(siteId, file)
  .then(async(res:any) => {
    console.log(res)
    for (let [fieldIndex, fieldUpdate] of this.activeFields.entries()) {
      if(fieldUpdate.slug === field.slug){
        this.activeFields[fieldIndex].data = await res?.data;
      }
    }
    this.popOverController.dismiss()
  })
  .catch((res:any) => {
    console.log(res)  
  })
}

  async editorChange(event: any, fieldUpdate: any) {
    // console.log(event,fieldUpdate);
    let slug = event.target.value.replace(/\s/g, '-').toLowerCase();
    for (let field of this.activeFields) {
      // console.log(field)
      // console.log(slug)
      if (field.slug === 'slug') {
        field['data'] = slug;
      }
    }
  }

  async changeImage(field: any){
    console.log(field)
  }

  async deleteImage(field: any){
    console.log(field)
  }

  cancel() {
    return this.modalService.dismiss(null, 'cancel');
  }
  async publishItem() {
    console.log(this.activeFields)
    let updatedArray = []

    for(let [fieldIndex, field] of this.activeFields.entries()){
      console.log(field.data)
      if(field.data !== null && field.data !== undefined && field.data !== ''){
        updatedArray.push({
          [field.slug]: field.data
        })
      } else {
        updatedArray.push({
          [field.slug]: ''
        })
      }
    }

    const mappedFields = updatedArray.reduce((acc: any, item: any) => {
      // For each item, we only expect one key
      const [ key ] = Object.keys(item); 
      acc[key] = item[key];
      return acc;
    }, {} as Record<string, any>);

    let jsonData = {
      isArchived: false,
      isDraft: false,
      fieldData: mappedFields
    }

    console.log(jsonData)
    this.itemsService.createItem(this.collectionService.collectionId, jsonData)
    .then(async(res: any) => {
      console.log(res)
      this.modalService.dismiss(null, 'success');
      this.presentToast('bottom', `Created successfully`);
    })
    .catch((err: any) => {
      console.log(err)
    })
    // return this.modalService.dismiss(null, 'cancel');
  }

async presentToast(position: 'top' | 'middle' | 'bottom', message?: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1850,
      position: position,
    });

    await toast.present();
  }
  saveAsDraft() {
    return this.modalService.dismiss(null, 'confirm');
  }
}