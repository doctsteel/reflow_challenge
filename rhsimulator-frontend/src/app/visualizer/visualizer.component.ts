import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResumesApiService} from '../resumes/resumes-api.service';
import {Resume} from '../resumes/resumes.model';
import * as Auth0 from 'auth0-web';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {
  resume = {
    name: '',
    content: '',
    curriculum: ''
  };

  constructor(private resumesApi: ResumesApiService, private router: ActivatedRoute, private lul: Router) {
  }
   yeetid = +this.router.snapshot.paramMap.get('id');
  ngOnInit() {
    const id = +this.router.snapshot.paramMap.get('id');
    this.resumesApi.getSingleResume(id).subscribe((resume: Resume) => {
      this.resume = resume;
    });
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
  saveEdits() {
    this.resumesApi.editResume(this.resume, this.yeetid).subscribe(() => this.lul.navigate(['/']), error => alert(error.message));
  }
}
