import { Editor, toHTML } from 'ngx-editor';
import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage {
  // editor: Editor = new Editor();
  editors: Editor[] = []  
  fields:any = []
  public editorContent: string = 'My initial content';
  constructor(public itemsService: ItemsService) { }
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
    // this.editor.destroy();
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
        console.log(JSON.parse(localStorage.getItem('activeFields') || ''))
      }
      for(let [fieldIndex, field] of this.fields.entries()){     
        if(this.itemsService.item?.fieldData?.[field.slug]){
          this.fields[fieldIndex].data = this.itemsService.item?.fieldData?.[field.slug]
          // if(field.type === 'Image' && !this.fields[fieldIndex].data?.url){
          //   this.fields[fieldIndex].data.url = '/placeholder.svg'
          // }
        }
        if(field.type === 'Image' && !this.itemsService.item?.fieldData?.[field.slug]){
          this.fields[fieldIndex].data = {url: 'assets/placeholder.svg'}
          console.log(field.slug, field.type)
        } 
        if(field.type === 'RichText'){
          this.editors.push(new Editor({
            
          }))
          this.fields[fieldIndex].editorNumber = this.editors.length - 1
          console.log(this.editors)
        }
      }
      this.fields = this.fields.reverse()
    
    })
    .catch((err: any) => {
      console.log(err)
    })
  }

  publishItemChanges(){
    console.log(this.fields)
    
  }

}
