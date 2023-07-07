import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs';
import { File } from '../models/file.model';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

  private API_URL = 'https://young-sands-07814.herokuapp.com/api/files';

  public getfile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap((content) => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  public uploadFile(file: Blob) {
    const data = new FormData();
    data.append('file', file);
    return this.http.post<File>(`${this.API_URL}/upload`, data, {
      // headers: {
      //   'Content-type': 'multipart/form-data',
      // },
    });
  }
}
