import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  private currentUser: Observable<any>;
  public redirectUrl: string;

  private loginUrl = 'http://localhost:3000/auth/login';
  private roleUrl = 'http://localhost:3000/auth/roles';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email, password) {
    return this.http.post<any>(this.loginUrl, { 'email': email, 'password': password }).pipe(
      map(res => {
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.currentUserSubject.next(res);
        this.getRoles(res.roleId);
        return res;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('roles');
    this.currentUserSubject.next(null);
  }

  getRoles(id: number) {
    return this.http.get<any>(this.roleUrl + '/' + id)
      .subscribe(res => {
        localStorage.setItem('roles', JSON.stringify(res));
      });
  }

  getUserRoles() {
    return JSON.parse(localStorage.getItem('roles'));
  }

  checkRole(url: string) {
    let roles = this.getUserRoles().roles;
    let checkUrl = '';
    let isMatch = false;
    if (roles) {
      roles = roles.replace(/\./g, '/');
      if (url.includes('detail')) {
        checkUrl = url.slice(1, url.lastIndexOf('/'));
      } else {
        checkUrl = url.substr(1);
      }
      if (roles.includes(checkUrl)) {
        isMatch = true;
      }
    }
    return isMatch;
  }
}
