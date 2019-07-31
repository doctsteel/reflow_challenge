import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as Auth0 from 'auth0-web';

@Component({
  selector: 'app-callbck',
  templateUrl: './callbck.component.html',
  styleUrls: ['./callbck.component.css']
})
export class CallbckComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    const self = this;
    Auth0.handleAuthCallback((err) => {
      if (err) {alert(err); }
      self.router.navigate(['/']);
    });
  }

}
