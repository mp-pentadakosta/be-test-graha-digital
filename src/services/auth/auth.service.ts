import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user.repository';
import { CustomHttpException } from '../../core/custom.http.exception';
import { ResponseSuccess } from '../../core/dto/response';
import { generateTokenUtils } from '../../utils/generate.token.utils';
import { errors } from '../../error/error';
import { comparePassword, hashPassword } from '../../utils/hash.utils';
import { LoginReqDto, RegisterReqDto, SessionDto } from '../../dto/auth.dto';
import { ProfileReqDto } from '../../dto/profile.dto';
import { DateTimeUtils } from '../../utils/date.time.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: UserRepository,
    private readonly dateTimeUtils: DateTimeUtils,
  ) {}

  async login(param: LoginReqDto) {
    const user = await this.authRepository.findByPhoneNumber(param.phoneNumber);

    if (!user) {
      throw new CustomHttpException(errors.USER_NOT_FOUND);
    }

    const isPasswordMatch = await comparePassword(
      param.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new CustomHttpException(errors.INVALID_CREDENTIAL);
    }

    const token = generateTokenUtils(user);

    const loginRespDto: SessionDto = {
      accessToken: token.token,
      refreshToken: 'token',
    };

    return ResponseSuccess.success(loginRespDto, 'Login success');
  }

  async register(param: RegisterReqDto) {
    const userExist = await this.authRepository.findByPhoneNumber(
      param.phoneNumber,
    );

    if (userExist) {
      throw new CustomHttpException(errors.DATA_ALREADY_EXIST, {
        message: 'User already exist',
      });
    }

    const password = await hashPassword(param.password);
    const user = await this.authRepository.createUser({
      fullName: param.fullName,
      email: param.email,
      password: password,
      phoneNumber: param.phoneNumber,
    });

    if (!user) {
      throw new CustomHttpException(errors.USER_NOT_FOUND);
    }

    const token = generateTokenUtils(user);
    const registerRespDto: SessionDto = {
      accessToken: token.token,
      refreshToken: '',
    };

    return ResponseSuccess.success(registerRespDto, 'Register success');
  }

  async upsertUser(data: ProfileReqDto): Promise<any> {
    const password = await hashPassword(data.password);
    await this.authRepository.upsertUser({
      id: data.id,
      fullName: data.fullName,
      password: password,
      phoneNumber: data.phoneNumber,
      email: data.email,
      dob: this.dateTimeUtils.stringToDate(data.dob),
      address: data.address,
    });

    return ResponseSuccess.success(
      null,
      data.id ? 'Update success' : 'Insert success',
    );
  }

  async delete(id: number) {
    await this.authRepository.deleteUser(id);

    return ResponseSuccess.success(null, 'Delete success');
  }
}
