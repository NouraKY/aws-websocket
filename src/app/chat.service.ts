import { Injectable } from '@angular/core';
// import { Observable, Subject } from '@rxjs/Rx';
import { Observable, Subject } from 'rxjs-compat/Rx';
import { WebsocketService } from './websocket.service';
const CHAT_URL = 'wss://0v5olaivn9.execute-api.us-west-2.amazonaws.com/Prod/';

export interface Message {
  action: string;
  data: string;
}

@Injectable()
export class ChatService {
  public messages: Subject<Message>;
  constructor(wsService: WebsocketService) {
    this.messages = <Subject <Message>> wsService.connect(CHAT_URL).map(
      (response: MessageEvent): Message => {
        const data = JSON.parse(response.data);
        return {
          action: data.author,
          data: data.message
        };
      }
    );
  }
}
