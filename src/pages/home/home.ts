import { Component }           from '@angular/core';
import { NavController }       from 'ionic-angular';
import { Geolocation }         from '@ionic-native/geolocation';
import { select     }          from 'ng2-redux';
import { Observable }          from 'rxjs/Observable';

import {IDocument}             from '../../reducers/risk-reducer';
import {RiskConnector}         from '../../connectors/risk-connector';

import { DocumentPage } from '../document/document';
 
declare var google;
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @select(['risk', 'documents'         ]) documentsStream:                  Observable<IDocument[]>;
  
  constructor(public navController: NavController, private geolocation: Geolocation, private riskConnector: RiskConnector) {
   
  }
 
  ionViewDidLoad(){
    this.riskConnector.getUncuratedDocuments(20);
  }

  getUncuratedDocuments(){
    this.riskConnector.getUncuratedDocuments(10);
  }

  getFactsFor(document: IDocument){
    //alert(document) 
    this.navController.push(DocumentPage)  
    this.riskConnector.getFactsFor(document);
  }

}