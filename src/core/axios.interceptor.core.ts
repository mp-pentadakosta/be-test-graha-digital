import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';

axios.interceptors.request.use(
  (request) => {
    Logger.warn(`METHOD : ${request.method}`);
    Logger.warn(`URL : ${request.url}`);
    Logger.warn(`Request Headers : ${JSON.stringify(request.headers)}`);
    Logger.warn(`Request Data : ${JSON.stringify(request.data)}`);
    Logger.warn('REQUEST...' + '\n');
    return request;
  },
  (error) => {
    Logger.error('REQUEST : ');
    Logger.error(`Request URL : ${error.config.url}`);
    Logger.error(`Request Headers : ${JSON.stringify(error.config.headers)}`);
    Logger.error(`Request Data : ${JSON.stringify(error.config.data)}`);
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    Logger.warn('RESPONSE : ');
    Logger.warn(`Response Status : ${response.status}`);
    Logger.warn(`PATH : ${JSON.stringify(response.config.url)}`);
    Logger.warn(`Response Headers : ${JSON.stringify(response.headers)}`);
    Logger.warn(`Response Body : ${JSON.stringify(response.data)}`);
    return response;
  },
  (error) => {
    if (error.response) {
      Logger.error('RESPONSE : ');
      Logger.error(`Response Status : ${error.response.status}`);
      Logger.error(`Request URL : ${error.config.url}`);
      Logger.error(`Response Headers : ${error.response.headers}`);
      Logger.error(
        `Response Body : ${error.response.data || 'No response body'}`,
      );
    } else {
      Logger.error('Message : ', error.message);
    }
    return Promise.reject(error);
  },
);

@Injectable()
export class AxiosInterceptorCore {
  constructor() {}

  async axiosRequest() {
    return axios;
  }
}
