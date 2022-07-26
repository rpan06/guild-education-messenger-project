export class MessageDTO {
  _id: string;
  username: string;
  message: string;
  createdAt: string;

  constructor(public input: MessageDTO) {
    this._id = input._id;
    this.username = input.username;
    this.message = input.message;
    this.createdAt = input.createdAt;
  }
}
