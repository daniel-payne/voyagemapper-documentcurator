import { Component, OnInit }   from '@angular/core';
import { select     }          from 'ng2-redux';
import { Observable }          from 'rxjs/Observable';

import {IDocument}             from '../../reducers/documents-reducer';
import {RiskConnector}         from '../../connectors/risk-connector';

@Component({
  selector: 'app-document-curator',
  templateUrl: './document-curator.component.html',
  styleUrls: ['./document-curator.component.css']
})
export class DocumentCuratorComponent implements OnInit {


   // @select(['documents', 'count'     ]) countDocumentsStream:             Observable<IDocument[]>;
    @select(['documents', 'uncurated' ]) uncuratedDocumentsStream:         Observable<IDocument[]>;
    @select(['documents', 'selected'  ]) selectedDocumentStream:           Observable<IDocument>;

    constructor (
      private riskConnector: RiskConnector
    ) {}

    getUncuratedDocuments(){
      this.riskConnector.getUncuratedDocuments();
    }

    getFactsFor(document: IDocument){
      this.riskConnector.getFactsFor(document);
    }


  ngOnInit() {
  }

}
