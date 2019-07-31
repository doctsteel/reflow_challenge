import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ResumesApiService} from './resumes/resumes-api.service';
import {HttpClientModule} from '@angular/common/http';
import {ResumesComponent} from './resumes/resumes.component';
import {RouterModule, Routes} from '@angular/router';
import {ResumesFormComponent} from './resumes/resumes-form.component';
import {CallbckComponent} from './callbck/callbck.component';
import * as Auth0 from 'auth0-web';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatInputModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { FilterPipe } from './filter.pipe';
import {FormsModule} from '@angular/forms';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  {path: 'new-resume', component: ResumesFormComponent},
  {path: '', component: ResumesComponent},
  {path: 'callback', component: CallbckComponent},
  {path: 'detalhes/:id', component: VisualizerComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ResumesFormComponent,
    ResumesComponent,
    CallbckComponent,
    VisualizerComponent,
    FilterPipe,
    AboutComponent
  ],
  imports: [
    FormsModule,
    MatInputModule,
    MatCardModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatMenuModule
  ],
  providers: [ResumesApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    Auth0.configure({
      domain: 'doctsteel.auth0.com',
      audience: 'rhsimulator.ayy.lmao',
      clientID: 'OYOHsP1g6v6X8vxjH2oDZyKExYoglf3p',
      redirectUri: 'https://doctsteel.github.io/rhsimulator/callback',
      scope: 'openid profile manage:resumes'
    });
  }
}
