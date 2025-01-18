import { ItemPage } from './item.page';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxEditorModule } from 'ngx-editor';
import { CommonModule } from '@angular/common';
import { ItemPageRoutingModule } from './item-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemPageRoutingModule,
    NgxEditorModule
  ],
  declarations: [ItemPage]
})
export class ItemPageModule {}
