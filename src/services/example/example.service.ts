import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user.repository';
import { ResponseSuccess } from '../../core/dto/response';
import { errors } from '../../error/error';
import { CustomHttpException } from '../../core/custom.http.exception';
import { DateTimeUtils } from '../../utils/date.time.utils';

@Injectable()
export class ExampleService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dateTimeUtils: DateTimeUtils,
  ) {}

  async getExample(page: number, limit: number): Promise<any> {
    const resp = await this.userRepository.getAllUser(page, limit);

    return ResponseSuccess.success({
      listData: resp.map((item) => {
        return {
          ...item,
          dob: item.dob
            ? this.dateTimeUtils.dateToStringYYYYMMDD(item.dob)
            : '',
        };
      }),
    });
  }

  async getDetail(id: number): Promise<any> {
    const resp = await this.userRepository.findByUserTokenId(id);

    if (!resp) {
      throw new CustomHttpException(errors.FAILED_GET_DATA);
    }

    return ResponseSuccess.success({
      data: {
        ...resp,
        dob: resp.dob ? this.dateTimeUtils.dateToStringDDMMMYYYY(resp.dob) : '',
      },
    });
  }

  async getSearch(search: string): Promise<any> {
    const resp = await this.userRepository.getSearch(search);

    return ResponseSuccess.success({
      listData: resp.map((item) => {
        return {
          ...item,
          dob: item.dob
            ? this.dateTimeUtils.dateToStringDDMMMYYYY(item.dob)
            : '',
        };
      }),
    });
  }
}
