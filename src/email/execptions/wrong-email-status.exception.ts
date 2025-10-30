export class WrongEmailStatusException extends Error {
  constructor() {
    super('Wrong email status transistion!');
    this.name = 'WrongEmailStatusException';
  }
}
