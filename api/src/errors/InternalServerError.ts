import { InternalError } from 'json-api-error';

export class InternalServerError extends InternalError {
  public constructor(message: string) {
    super({
      id: 'InternalError',
      code: 'InternalError',
      title: 'An unknown error occurred on the server.',
      detail: message,
    });
  }
}
