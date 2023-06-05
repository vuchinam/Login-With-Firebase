import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';
import { ChatService } from 'src/app/services/chat.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$ = this.userService.currenUserProfile$;

  searchControl = new FormControl();

  getUser = combineLatest([
    this.userService.allUsers,
    this.user$,
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([users, user, searchString]) =>
      users.filter(
        (u) =>
          u.displayName?.toLowerCase().includes(searchString) &&
          u.uid !== user?.uid
      )
    )
  );

  myChats = this.chatService.myChats;

  constructor(
    private userService: UsersService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {}

  createChat(otherUser: ProfileUser): void {
    this.chatService.createChat(otherUser).subscribe();
  }
}
