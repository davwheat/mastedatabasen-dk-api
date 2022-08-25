import { JapiError } from 'ts-japi';

export class InvalidParameterError extends JapiError {
  public constructor(message: string, paramName: string) {
    super({
      status: 400,
      code: 'InvalidParameterError',
      title: 'Invalid parameter provided',
      detail: message,
      source: {
        parameter: paramName,
      },
    });
  }
}
