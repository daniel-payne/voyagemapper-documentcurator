import { Component, ElementRef, OnInit, Input, OnChanges, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef }                             from '@angular/material';

import { RiskConnector }                        from '../../connectors/risk-connector';
import { DocumentEditDialogComponent }          from '../../presenters/document-edit-dialog/document-edit-dialog.component';


@Component({
  selector: 'app-selected-document',
  templateUrl: './selectedDocument.component.html',
  styleUrls: [ './selectedDocument.component.css']
})
export class SelectedDocumentComponent implements OnInit, OnChanges {

  @Input() selectedDocument;

  dialogRef: MdDialogRef<DocumentEditDialogComponent>;

  lat: number = 51.678418;
  lng: number = 0.809007;

  displayPolylines = [];

  constructor (
    private elementRef:    ElementRef,
    private riskConnector: RiskConnector,
    public dialog: MdDialog,
    public viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges () {

    let newDisplayPolylines = [];

    if (this.selectedDocument && this.selectedDocument.facts){

      this.selectedDocument.facts.forEach( (item) => {

         if (item.factPolyLines) {

            if (item.factPolyLines[0][0]) {
              newDisplayPolylines = newDisplayPolylines.concat( item.factPolyLines );
            } else {
              newDisplayPolylines = [ ...newDisplayPolylines, item.factPolyLines]
            }

         }

      });

    }

    this.displayPolylines = newDisplayPolylines;

  }

  saveFactDiscarded(fact) {
    this.riskConnector.saveFactDiscarded(fact);
  }

  saveFactStatus(fact, category) {
    this.riskConnector.saveFactCategory(fact, category);
  }

  saveFactMerge(fact) {
    this.riskConnector.saveFactMerge(fact);
  }

  resetDocument(document) {
    this.riskConnector.resetDocument(document);
  }

  saveDocumentStatusAsCurrated(document) {
    this.elementRef.nativeElement.querySelector('md-toolbar').scrollIntoView();
  }

  openDocumentInNewWindow(source) {
    window.open(source, '_blank');
  }

  openEditor(fact) {
    let config              = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(DocumentEditDialogComponent, config);

    this.dialogRef.componentInstance.editText = fact.displayText ? fact.displayText : fact.factText ;

    this.dialogRef.afterClosed().subscribe(result => {

      if (result) {
         this.riskConnector.saveFactText(fact, result);
      }

      this.dialogRef       = null;
    });

  }

}

