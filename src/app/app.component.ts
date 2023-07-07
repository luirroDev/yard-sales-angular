import { Component } from '@angular/core';
import { Product } from './models/product.model';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  private token = '';
  imgRta = '';

  constructor(
    private authServ: AuthService,
    private usersServ: UsersService,
    private fileService: FilesService
  ) {}

  public onLoaded(img: string) {
    console.log('log padre', img);
  }

  public toggleImg() {
    this.showImg = !this.showImg;
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

  public downloadFile() {
    this.fileService
      .getfile(
        'myfile.pdf',
        'https://mozilla.github.io/pdf.js/web/compressed.tracemokey-pldi-09.pdf',
        'aplication/pdf'
      )
      .subscribe();
  }

  public onUpload(event: Event) {
    console.log(event);
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService.uploadFile(file).subscribe((res) => {
        console.log(res);
        this.imgRta = res.location;
      });
    }
  }
}
