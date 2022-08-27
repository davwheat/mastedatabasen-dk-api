import { NotFoundError } from 'json-api-error';

export class ModelNotFoundError extends NotFoundError {
  public constructor(message: string, modelName: string) {
    super({
      id: 'NotFoundError',
      code: 'NotFoundError',
      title: `Model (${modelName}) not found`,
      detail: message,
    });
  }
}
