import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DocumentCuratorComponent} from './containers/document-curator/document-curator.component';
import {CountryCuratorComponent } from './containers/country-curator/country-curator.component';

const routes: Routes = [
  { path: '',          redirectTo: 'documents', pathMatch: 'full' },
  { path: 'documents', component: DocumentCuratorComponent },
  { path: 'countries', component: CountryCuratorComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class ApplicationRoutes { }
