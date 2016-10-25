import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AgmCoreModule }  from 'angular2-google-maps/core';

import { StoreEnhancer }          from 'redux';
import { NgReduxModule, NgRedux } from 'ng2-redux';

import { AppComponent }                                 from './app.component';
import { IApplicationState, rootReducer, initialState}  from './app.reducer';

import { RiskConnector }                      from './connectors/risk-connector';
import { ApplicationRoutes }                  from './app-routing.module';

import { DocumentCuratorComponent }           from './containers/document-curator/document-curator.component';
import { CountryCuratorComponent }            from './containers/country-curator/country-curator.component';

import { SelectedDocumentComponent }          from './presenters/selectedDocument/selectedDocument.component';
import { DocumentListingComponent }           from './presenters/document-listing/document-listing.component';
import { CountryListingComponent }            from './presenters/country-listing/country-listing.component';
import { DocumentEditDialogComponent }        from './presenters/document-edit-dialog/document-edit-dialog.component';
 
let devtools: StoreEnhancer<IApplicationState> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() : f => f;

@NgModule({
  declarations: [
    AppComponent,
    SelectedDocumentComponent,
    DocumentCuratorComponent,
    CountryCuratorComponent,
    CountryListingComponent,
    DocumentListingComponent,
    DocumentEditDialogComponent 
  ],
  entryComponents: [
    DocumentEditDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
    ApplicationRoutes,
    MaterialModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBGlrG3kSfPgg0ii-XFkIy-zoOiXnOxW1c'
    })
  ],
  providers: [
    RiskConnector,
    { provide: 'REST_URL', useValue: 'http://localhost:5000/'}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

  constructor(ngRedux: NgRedux<IApplicationState>) {
    ngRedux.configureStore(rootReducer, initialState, [], [devtools] );
  }

}
