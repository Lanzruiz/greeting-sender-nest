export class WrongUserStatusException extends Error {
  constructor() {
    super('Wrong user status transistion!');
    this.name = 'WrongUserStatusException';
  }
}
