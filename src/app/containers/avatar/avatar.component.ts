import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: []
})
export class AvatarComponent implements OnInit {

  isLogged = false;
  userId = 0;
  avatar = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.currentUserValue) {
      this.avatar = this.authService.currentUserValue.avatar;
      this.userId = this.authService.currentUserValue.id;
      this.isLogged = true;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
