import { JapiError } from 'ts-japi';

export class ModelNotFoundError extends JapiError {
  public constructor(message: string, modelName: string) {
    super({
      status: 404,
      code: 'ModelNotFoundError',
      title: `No model (${modelName}) matching criteria found.`,
      detail: message,
    });
  }
}
