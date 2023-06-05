import { ProfileUser } from './user-profile';

export interface Chat {
  id: string | any;
  lastMessage?: string | any;
  lastMessageDate?: Date | any;
  userIds: string[];
  users: ProfileUser[];

  // not stored, only for display
  chatPic?: string | any;
  chatName?: string | any;
}

export interface Message {
  text: string | any;
  senderId: string | any;
  sentDate: Date | any;
}
