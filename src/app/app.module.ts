import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//import { IonicPageModule } from 'ionic-angular';

import { HttpModule }     from '@angular/http';

import { StoreEnhancer }          from 'redux';
import { NgReduxModule, NgRedux } from 'ng2-redux';

import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { IApplicationState, rootReducer, initialState}  from './app.reducer';

import { RiskConnector }                      from '../connectors/risk-connector';

import { HomePage }        from '../pages/home/home';

import { MapModule }         from '../pages/map/map.module';
import { DocumentModule}     from '../pages/document/document.module'; 

let devtools: StoreEnhancer<IApplicationState> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() : f => f;

@NgModule({
  declarations: [
    MyApp,
    HomePage 
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    //Page Modules
    MapModule,
    DocumentModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    RiskConnector,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: 'REST_URL', useValue: 'http://localhost:1337/'}
  ]
})
export class AppModule {
  
  constructor(ngRedux: NgRedux<IApplicationState>) {
    ngRedux.configureStore(rootReducer, initialState, [], [devtools] );
  }

}
