import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { select     }          from 'ng2-redux';
import { Observable }          from 'rxjs/Observable';

import {IDocument}             from '../../reducers/risk-reducer';
import {RiskConnector}         from '../../connectors/risk-connector';

@IonicPage()
@Component({
  selector: 'page-document',
  templateUrl: 'document.html',
})
export class DocumentPage {

  @select(['risk', 'selectedDocument'  ]) selectedDocumentStream:           Observable<IDocument>;
 

  constructor(public navController: NavController, public navParams: NavParams, private riskConnector: RiskConnector) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Document');
  }

}
