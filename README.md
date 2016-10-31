# voyagemapper-documentcurator
Curates facts scraped from various public websites
 
This application is a "Proof of Concept" project built with Redux, Angular 2 and Angular Material 2

The following are used to manage the asynchronous data pipeline
* app/connectors
* app/reducers 

The data stream flows back into the application with the use of ng2-redux in 
* app/containers


```javascript 
  @select(['risk', 'selectedDocument'  ]) selectedDocumentStream:  Observable<IDocument>; 
 
  [selectedDocument]="selectedDocumentStream | async"
``` 


The data is visualized using standard angular2 @input in 
* app/presenters

![Dataflow](https://raw.githubusercontent.com/daniel-payne/voyagemapper-documentcurator/master/Images/dataflow.png)
 