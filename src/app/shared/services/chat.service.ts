import {Injectable} from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/database';
import {EventService} from '../../core/services/event.service';
import {EventConstant} from '../constant/event.constant';

@Injectable()
export class ChatService {
  firebuddychats = firebase.database().ref('/buddychats');
  buddy: any;
  buddymessages = [];

  constructor(private eventService: EventService) {}

  initializebuddy(buddy) {
    this.buddy = buddy;
  }

  addnewmessage(msg, userId, sendTo) {
    const promise = new Promise((resolve, reject) => {
      this.firebuddychats.child(userId).child(sendTo).push({
        sentby: userId,
        message: msg,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }).then(() => {
        this.firebuddychats.child(sendTo).child(userId).push({
          sentby: userId,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          resolve(true);
        });
      });
    });
    return promise;
  }

  getbuddymessages(userId, FromId) {
    let temp;
    this.firebuddychats.child(userId).child(FromId).on('value', (snapshot) => {
      this.buddymessages = [];
      temp = snapshot.val();
      // tslint:disable-next-line:forin
      for (const tempkey in temp) {
        this.buddymessages.push(temp[tempkey]);
      }

      this.eventService.publish(EventConstant.CHAT_DATA, null);
    });
  }

  getChefdata(userId, FromId) {
    let temp;
    this.firebuddychats.child(userId).child(FromId).on('value', (snapshot) => {
      this.buddymessages = [];
      temp = snapshot.val();
      for (const tempkey in temp) {
        this.buddymessages.push(temp[tempkey]);
      }
      // this.events.publish('chefchatData');
    });
  }

  removeChat(fromId, toId) {
    this.firebuddychats.child(fromId).child(toId).remove();
  }

  getChatExist(chefId, userId) {
    let temp;
    this.firebuddychats.child(chefId).child(userId).on('value', (snapshot) => {
      const tempArray = [];
      temp = snapshot.val();
      // tslint:disable-next-line:forin
      for (const tempkey in temp) {
        tempArray.push(temp[tempkey]);
      }
      this.eventService.publish(EventConstant.CHAT_EXIST, tempArray);
    });
  }

  offListener(userId, FromId) {
    this.firebuddychats.child(userId).child(FromId).off();
  }
}
