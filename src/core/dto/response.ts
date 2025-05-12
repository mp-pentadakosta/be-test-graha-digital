export class ResponseSuccessDto<T> {
  code: string;
  message: string;
  result: T;
}

export class ResponseSuccess {
  public static success<T>(result: T, message?: string): ResponseSuccessDto<T> {
    return {
      code: '00',
      message: message ?? 'Success',
      result,
    };
  }
}
