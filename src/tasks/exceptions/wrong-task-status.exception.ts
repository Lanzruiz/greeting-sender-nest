export class WrongTaskStatusException extends Error {
  constructor() {
    super('Wrong task status transistion!');
    this.name = 'WrongTaskStatusException';
  }
}
