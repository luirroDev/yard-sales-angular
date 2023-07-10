import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { User } from 'src/app/models/user.model';
import { Category } from 'src/app/models/category.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoryService: CategoriesService,
    private usersServ: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$.subscribe((data) => {
      this.profile = data;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  public getAllCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }

  public login() {
    this.authService.loginAndGet('admin@mail.com', 'admin123').subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }

  public createUser() {
    this.usersServ
      .create({
        name: 'Leonardo Antonio',
        email: 'leona@gmail.com',
        password: '121212',
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  public logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }
}
