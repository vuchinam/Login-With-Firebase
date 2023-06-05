import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from './services/users.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user$ = this.usersService.currenUserProfile$;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private usersService: UsersService
  ) {}

  logOut() {
    this.authService.logout().subscribe(() => {
      this.user$;
      this.router.navigate(['/login']);
    });
  }
}
