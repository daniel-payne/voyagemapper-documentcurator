import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { MdDialogRef }                          from '@angular/material';

@Component({
  selector: 'app-document-edit-dialog',
  template: `
    <h4 color="accent">Edit Text</h4>
    <div>
      <textarea cols="80" rows="10" #editedText style="border-width: 0" >{{ editText }}</textarea>
    </div>
    <button md-button  color="primary" (click)="dialogRef.close(editedText.value)">Update</button>
    <button md-button  color="accent"  (click)="dialogRef.close()">Cancel</button>
  `
})
export class DocumentEditDialogComponent implements OnInit {

  @Input() editText;

  constructor(
    private elementRef:    ElementRef,
    public  dialogRef:     MdDialogRef<DocumentEditDialogComponent>
  ) { }

  ngOnInit () {
    this.elementRef.nativeElement.querySelector('textarea').focus();
  }

}

 