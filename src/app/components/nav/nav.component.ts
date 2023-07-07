import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  public login() {
    // this.authService
    //   .login('leona@gmail.com', '121212')
    //   .subscribe((response) => {
    //     this.token = response.access_token;
    //     this.getUser();
    //     console.log(this.token);
    //   });
    this.authService
      .loginAndGet('leona@gmail.com', '121212')
      .subscribe((user) => (this.profile = user));
  }
}
