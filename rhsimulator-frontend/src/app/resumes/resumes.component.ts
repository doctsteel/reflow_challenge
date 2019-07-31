import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Resume} from './resumes.model';
import {ResumesApiService} from './resumes-api.service';
import * as Auth0 from 'auth0-web';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.css']
})
export class ResumesComponent implements OnInit, OnDestroy {
  resumesListSubs: Subscription;
  resumesList: Resume[];
  authenticated = false;
  filterText: any;

  constructor(private resumesApi: ResumesApiService) {

  }

  delete(resumeId: number) {
    this.resumesApi
      .deleteResume(resumeId)
      .subscribe(() => {
        this.resumesListSubs = this.resumesApi
          .getResumes()
          .subscribe(res => {
              this.resumesList = res;
            },
            console.error
          );
      }, console.error);
  }

  isAdmin() {
    if (!Auth0.isAuthenticated()) {
      return false;
    }

    const roles = Auth0.getProfile()['http://rhsimulator.ayy.lmao/roles'];
    return roles.includes('admin');
  }


  ngOnInit() {
    this.resumesListSubs = this.resumesApi
      .getResumes()
      .subscribe(res => {
          this.resumesList = res;
        },
        console.error
      );
    const self = this;
    Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
  }

  ngOnDestroy() {
    this.resumesListSubs.unsubscribe();
  }
}
