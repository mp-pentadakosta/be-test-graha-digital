import { HttpStatus } from '@nestjs/common';

export const errors = {
  INTERNAL_SERVER_ERROR: {
    code: '99',
    message: 'Internal server error',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  },
  USER_NOT_FOUND: {
    code: '40',
    message: 'User not found',
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  },
  FAILED_CREATE_DATA: {
    code: '40',
    message: "Can't create user",
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Can't create user",
  },
  INVALID_CREDENTIAL: {
    code: '40',
    message: 'Invalid credential',
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credential',
  },
  INVALID_EMAIL: {
    code: '40',
    message: 'Invalid email',
    status: HttpStatus.BAD_REQUEST,
  },
  INVALID_REQUEST_DATA: {
    code: '40',
    message: 'Invalid request data',
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request data',
  },
  INVALID_PASSWORD: {
    code: '40',
    message: 'Invalid password',
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid password',
  },
  FAILED_GET_DATA: {
    code: '40',
    message: "Can't get data",
    status: HttpStatus.BAD_REQUEST,
    description: "Can't get data",
  },
  FAILED_UPDATE_DATA: {
    code: '40',
    message: "Can't update data",
    status: HttpStatus.BAD_REQUEST,
    description: "Can't update data",
  },
  FAILED_CONVERT_DATA: {
    code: '40',
    message: "Can't update data",
    status: HttpStatus.BAD_REQUEST,
    description: "Can't update data",
  },
  DATA_ALREADY_EXIST: {
    code: '40',
    message: 'Data already exist',
    status: HttpStatus.BAD_REQUEST,
    description: 'Data already exist',
  },
  FAILED_DELETE_DATA: {
    code: '40',
    message: "Can't delete data",
    status: HttpStatus.BAD_REQUEST,
    description: "Can't delete data",
  },
};
