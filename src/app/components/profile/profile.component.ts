import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { concatMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { UsersService } from 'src/app/services/users.service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { ProfileUser } from 'src/app/models/user-profile';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$ = this.userService.currenUserProfile$;

  profileForm = new FormGroup({
    uid: new FormControl(''),
    displayName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(
    private authService: AuthenticationService,
    private imageUploadService: ImageUploadService,
    private userService: UsersService
  ) {}
  ngOnInit(): void {
    this.userService.currenUserProfile$
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
  }

  uploadFile(e: any, u: ProfileUser) {
    this.imageUploadService
      .uploadImage(e.target.files[0], `images/profile/${u.uid}`)
      .pipe(
        concatMap((photoURL) =>
          this.userService.updateUser({ uid: u.uid, photoURL })
        )
      )
      .subscribe();
  }

  saveProfile() {
    const profileData: any = this.profileForm.value;
    this.userService.updateUser(profileData).subscribe();
  }
}
