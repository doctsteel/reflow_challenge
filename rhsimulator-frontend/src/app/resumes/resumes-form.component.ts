import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResumesApiService} from './resumes-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'resumes-form',
  templateUrl: './resumes-form.component.html',
  styles: [`
  .full-width {
    width: 100%;
  }
  mat-card{
    margin-top: 100px;
  }`]
})

export class ResumesFormComponent {
  resume = {
    name: '',
    content: '',
    curriculum: ''
  };

  constructor(private resumesApi: ResumesApiService, private router: Router) {
  }

  updateName(event: any) {
    this.resume.name = event.target.value;
  }

  updateContent(event: any) {
    this.resume.content = event.target.value;
  }

  updateCurriculum(event: any) {
    this.resume.curriculum = event.target.value;
  }

  saveResume() {
    this.resumesApi.saveResume(this.resume).subscribe(() => this.router.navigate(['/']), error => alert(error.message));
  }
}
