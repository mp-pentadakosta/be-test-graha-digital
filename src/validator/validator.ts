import { isEmail } from 'class-validator';
import { CustomHttpException } from '../core/custom.http.exception';
import { errors } from 'src/error/error';

const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const email = (value: string) => {
  if (!isEmail(value)) {
    throw new CustomHttpException(errors.INVALID_EMAIL);
  }
};
const username = (value: string) => {
  if (value.length < 3) {
    throw new CustomHttpException(errors.INVALID_REQUEST_DATA);
  }
};

const password = (value: string) => {
  if (!re.test(value)) {
    throw new CustomHttpException(errors.INVALID_PASSWORD);
  }
};

const name = (value: string) => {
  if (value.length < 3) {
    throw new CustomHttpException(errors.INVALID_REQUEST_DATA, {
      message: 'Field must be a string',
    });
  }
};

const price = (value: number) => {
  if (value < 0) {
    throw new CustomHttpException(errors.INVALID_REQUEST_DATA, {
      message: 'Field must be a number',
    });
  }
};

const duration = (value: number) => {
  if (value < 0) {
    throw new CustomHttpException(errors.INVALID_REQUEST_DATA, {
      message: 'Field must be a number',
    });
  }
};

const number = (value: number) => {
  if (value < 0) {
    throw new CustomHttpException(errors.INVALID_REQUEST_DATA, {
      message: 'Field must be a number',
    });
  }
};

const string = (value: string) => {
  if (value.length < 0) {
    throw new CustomHttpException(errors.INVALID_REQUEST_DATA, {
      message: 'Field must be a string',
    });
  }
};

export const validator = {
  email,
  password,
  username,
  name,
  price,
  duration,
  number,
  string,
};
