import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentPage } from './document';

@NgModule({
  declarations: [
    DocumentPage,
  ],
  imports: [
    IonicPageModule.forChild(DocumentPage),
  ],
  exports: [
    DocumentPage
  ]
})
export class DocumentModule {}
