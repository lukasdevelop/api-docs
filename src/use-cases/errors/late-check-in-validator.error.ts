export class LateCheckInValidatorError extends Error {
  constructor() {
    super('The check-in car only be validated intil 20 miinutes of its creation');
  }
}