import { Component, OnInit }   from '@angular/core';
import { select     }          from 'ng2-redux';
import { Observable }          from 'rxjs/Observable';

import {IDocument}             from '../../reducers/risk-reducer';
import {RiskConnector}         from '../../connectors/risk-connector';

@Component({
  selector: 'app-document-curator',
  templateUrl: './document-curator.component.html',
  styleUrls: ['./document-curator.component.css']
})
export class DocumentCuratorComponent implements OnInit {


//  @select(['risk', 'count'             ]) countDocumentsStream:             Observable<IDocument[]>;
    @select(['risk', 'documents'         ]) documentsStream:                  Observable<IDocument[]>;
    @select(['risk', 'selectedDocument'  ]) selectedDocumentStream:           Observable<IDocument>;

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
