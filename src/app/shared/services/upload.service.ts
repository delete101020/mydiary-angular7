import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private uploadUrl = 'http://localhost:3000/upload/single';

  constructor(
    private http: HttpClient
  ) { }

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
}
