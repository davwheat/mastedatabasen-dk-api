import { BadRequestError } from 'json-api-error';

export class InvalidParameterError extends BadRequestError {
  public constructor(message: string, paramName: string) {
    super({
      id: 'BadRequestError',
      code: 'BadRequestError',
      title: `Invalid parameter (${paramName})`,
      detail: message,
    });
  }
}
