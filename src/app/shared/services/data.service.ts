import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Config } from '../models';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private backendUrl = 'http://localhost:3000/api';
  private uploadUrl = 'http://localhost:3000/upload/single';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // CRUD
  getList(config: Config): Observable<any[]> {
    return this.http.get<any[]>(this.getApiUrl(config, 'list')).pipe(
      catchError(this.handleError<any[]>('Get list', []))
    );
  }

  getDetail(config: Config): Observable<any> {
    return this.http.get<any>(this.getApiUrl(config, 'detail')).pipe(
      catchError(this.handleError<any[]>('Get detail'))
    );
  }

  createData(config: Config): Observable<any> {
    return this.http.post<any>(this.getApiUrl(config, 'create'), config.data).pipe(
      catchError(this.handleError<any[]>('Create'))
    );
  }

  editData(config: Config): Observable<any> {
    return this.http.put(this.getApiUrl(config, 'edit'), config.data).pipe(
      catchError(this.handleError<any[]>('Edit'))
    );
  }

  deleteData(config: Config): Observable<any> {
    return this.http.delete<any>(this.getApiUrl(config, 'delete')).pipe(
      catchError(this.handleError<any[]>('Delete'))
    );
  }

  getApiUrl(config: Config, operation: string): string {
    let apiUrl = this.backendUrl;
    if (config.hasOwnProperty('parentTable')) {
      apiUrl = apiUrl + '/' + config.parentTable + '/' + config.parentId;
    }
    switch (operation) {
      case 'list': apiUrl = apiUrl + '/' + config.table + '/list'; break;
      case 'detail': apiUrl = apiUrl + '/' + config.table + '/' + config.id; break;
      case 'create': apiUrl = apiUrl + '/' + config.table + '/create'; break;
      case 'edit': apiUrl = apiUrl + '/' + config.table + '/edit/' + config.id; break;
      case 'delete': apiUrl = apiUrl + '/' + config.table + '/delete/' + config.id; break;
    }
    console.log('From Data Service: ' + apiUrl);
    return apiUrl;
  }

  async upload(file: File) {
    const formData = new FormData();
    formData.append('image', file, file.name);
    let path = '';
    await this.http.post<any>(this.uploadUrl, formData).toPromise()
      .then(res => {
        path = res.path;
      });
    return path;
  }

  private handleError<T> (operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
