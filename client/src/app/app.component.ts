import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageDTO } from 'src/app/models/message.model';
import { MessagesService } from './services/messages.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  chatMessages: MessageDTO[] = [];
  inputForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.maxLength(200),
    ]),
  });
  isLoading = false;

  get usernameForm(): FormControl {
    return this.inputForm.get('username') as FormControl;
  }

  get messageForm(): FormControl {
    return this.inputForm.get('message') as FormControl;
  }

  constructor(public messageService: MessagesService) {}

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.isLoading = true;
    this.messageService
      .getMessages()
      .pipe(take(1))
      .subscribe(
        (response: any) => {
          this.chatMessages = response;
          this.isLoading = false;
        },
        (err: any) => {
          console.log(err);
          alert(`Server Error: ${err.message}. Please try again later. `);
          this.isLoading = false;
        }
      );
  }

  onSend(): void {
    this.isLoading = true;
    this.messageService
      .saveMessages(this.inputForm.value as MessageDTO)
      .pipe(take(1))
      .subscribe(
        () => {
          this.messageForm.reset();
          this.getMessages();
        },
        (err: any) => {
          alert(`Server Error: ${err.message}. Please try again later. `);
          this.isLoading = false;
        }
      );
  }
}
