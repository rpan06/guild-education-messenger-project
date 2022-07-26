import { MessagesService } from './services/messages.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { MessageDTO } from './models/message.model';

const MockMessageData = [
  {
    username: 'Test1',
    message: 'Testing Message',
    createdAt: '',
  } as MessageDTO,
];

class MockMessengesService {
  getMessages() {
    return of(MockMessageData);
  }

  saveMessages() {
    return of({ success: true, message: 'Messsage successfully saved' });
  }
}

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        { provide: MessagesService, useClass: MockMessengesService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with one message', () => {
    component.ngOnInit();
    expect(component.chatMessages).toEqual(MockMessageData);
  });

  it('should initialize with a form', () => {
    expect(component.inputForm.value).toEqual({ username: '', message: '' });
  });

  it('should call getMessages when send button is clicked', () => {
    component.onSend();
    const getMessagesSpy = spyOn(component, 'getMessages');
    expect(getMessagesSpy).toHaveBeenCalled;
  });
});
