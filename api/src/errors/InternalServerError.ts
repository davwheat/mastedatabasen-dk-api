import { JapiError } from 'ts-japi';

export class InternalServerError extends JapiError {
  public constructor(message: string) {
    super({
      status: 500,
      code: 'InternalServerError',
      title: 'An unknown error occurred on the server.',
      detail: message,
    });
  }
}
