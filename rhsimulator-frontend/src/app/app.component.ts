import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Resume} from './resumes/resumes.model';
import {ResumesApiService} from './resumes/resumes-api.service';
import * as Auth0 from 'auth0-web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authenticated = false;
  signIn = Auth0.signIn;
  signOut = Auth0.signOut;
  userProfile = Auth0.getProfile();

  ngOnInit() {
    const self = this;
    Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
  }
}
