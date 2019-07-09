import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { apiUrl } from '../../config';
import { Config } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = apiUrl;

  constructor(
    private http: HttpClient
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
    let url = this.apiUrl;
    if (config.hasOwnProperty('parentTable')) {
      url = url + '/' + config.parentTable + '/' + config.parentId;
    }
    switch (operation) {
      case 'list': url = url + '/' + config.table + '/list'; break;
      case 'detail': url = url + '/' + config.table + '/' + config.id; break;
      case 'create': url = url + '/' + config.table + '/create'; break;
      case 'edit': url = url + '/' + config.table + '/edit/' + config.id; break;
      case 'delete': url = url + '/' + config.table + '/delete/' + config.id; break;
    }
    return url;
  }

  private handleError<T> (operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
