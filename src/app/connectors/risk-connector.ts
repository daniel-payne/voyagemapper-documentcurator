import { Injectable, Inject }     from '@angular/core';
import { Http, Response }         from '@angular/http';
import { NgRedux    }             from 'ng2-redux';

import {IApplicationState}                                                             from '../app.reducer';
import {IDocument, loadUncurated, loadFacts, updateFacts}                              from '../reducers/risk-reducer';

@Injectable()
export class RiskConnector {

  constructor (
    private ngRedux:     NgRedux<IApplicationState>,
    private http:        Http,
    @Inject('REST_URL')
    private restUrl:     string
  ) {
  }

  getUncuratedDocuments(){

    this.http.get(this.restUrl + 'risk/documents/uncurated')
             .subscribe((response: Response) => {

                const data = response.json();

                this.ngRedux.dispatch( loadUncurated( data ));

            });

  }

  getFactsFor(document: IDocument){

    this.http.get(this.restUrl + `risk/documents/${document.documentId}/facts`)
             .subscribe((response: Response) => {
 
                const data = response.json();

                data.forEach( item => {

                  if (item.analysisCategories) {
                    item.categories = ['DISCARD', ...item.analysisCategories.split(',') ];
                  } else {
                    item.categories = ['DISCARD'];
                  }

                  if (item.factGeography) {

                    item.factPolyLines = JSON.parse(item.factGeography);

                  }

                });

                this.ngRedux.dispatch( loadFacts( data, document ) );

            });

  }

  saveFactDiscarded(fact) {

    let isDiscarded = fact.isDiscarded || false;

    isDiscarded = !isDiscarded;

    this.http.put(this.restUrl + `risk/facts/${fact.factId}`, {isDiscarded: isDiscarded})
      .subscribe((response: Response) => {

        const data = response.json();

        this.ngRedux.dispatch( updateFacts( data ) );

      });

  }

  saveFactCategory(fact, category) {

    this.http.put(this.restUrl + `risk/facts/${fact.factId}`, {category: category})
      .subscribe((response: Response) => {

        const data = response.json();

        this.ngRedux.dispatch( updateFacts( data ) );

      });

  }

  saveFactMerge(fact) {

    this.http.put(this.restUrl + `risk/facts/${fact.factId}`, {isMerged: true})
      .subscribe((response: Response) => {

        const data = response.json();

        this.ngRedux.dispatch( updateFacts( data ) );
      });

  }

  saveFactText(fact, text) {

    this.http.put(this.restUrl + `risk/facts/${fact.factId}`, {text: text})
      .subscribe((response: Response) => {

        const data = response.json();

        this.ngRedux.dispatch( updateFacts( data ) );
      });

  }

  resetDocument(document: IDocument) {

    this.http.put(this.restUrl + `risk/documents/${document.documentId}`, {reset: true})
      .subscribe((response: Response) => {

        const data = response.json();

        this.ngRedux.dispatch( loadFacts( data, document ) );

      });

  }
}
