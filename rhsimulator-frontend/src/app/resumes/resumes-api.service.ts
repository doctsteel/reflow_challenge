import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Resume} from './resumes.model';
import {API_URL} from '../env';
import {throwError} from 'rxjs';
import {FilterPipe} from '../filter.pipe';

import {catchError} from 'rxjs/operators';
import * as Auth0 from 'auth0-web';


@Injectable()
export class ResumesApiService {

  constructor(private http: HttpClient) {
  }

  filteredResumes: Resume[] = [];
  totalResumes: Resume[] = [];

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Erro: não foi possivel completar a requisição.');
  }

  // GET da lista de currículos
  getResumes(): Observable<Resume[]> {
    // @ts-ignore
    return this.http.get(`${API_URL}/resumes`).pipe(catchError((e: any) => {
      return ResumesApiService._handleError(e);
    }));
  }

  saveResume(resume: Resume): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${Auth0.getAccessToken()}`
      })
    };
    return this.http.post(`${API_URL}/resumes`, resume, httpOptions);
  }

  getSingleResume(resumeId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${Auth0.getAccessToken()}`
      })
    };
    return this.http.get(`${API_URL}/detalhes/${resumeId}`, httpOptions);
  }

  deleteResume(resumeId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${Auth0.getAccessToken()}`
      })
    };
    return this.http.delete(`${API_URL}/resumes/${resumeId}`, httpOptions);
  }

  editResume(resume: Resume, resumeId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${Auth0.getAccessToken()}`
      })
    };
    return this.http.post(`${API_URL}/detalhes/${resumeId}`, resume, httpOptions);
  }

}
