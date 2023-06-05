import { Injectable } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { Observable, from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private storage: Storage) {}

  uploadImage(image: File, path: any): Observable<any> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
}
