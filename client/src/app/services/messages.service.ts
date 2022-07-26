import { ApiResponse } from './../models/apiResponse.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageDTO } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(public httpClient: HttpClient) {}

  getMessages(): Observable<MessageDTO[]> {
    const url = `${environment.mongoDBServer}/message`;
    return this.httpClient.get<MessageDTO[]>(url).pipe(
      map((messageList: MessageDTO[]) => {
        return messageList;
      })
    );
  }

  saveMessages(payload: MessageDTO): Observable<ApiResponse> {
    const url = `${environment.mongoDBServer}/message/save`;
    return this.httpClient.post<ApiResponse>(url, payload);
  }
}
