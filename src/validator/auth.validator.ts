import { validator } from './validator';
import { LoginReqDto, RegisterReqDto } from '../dto/auth.dto';

export const validateLoginFields = (fields: LoginReqDto) => {
  validator.username(fields.phoneNumber);
};

export const validateRegisterFields = (fields: RegisterReqDto) => {
  validator.username(fields.phoneNumber);
  validator.email(fields.email);
  validator.password(fields.password);
};

// export const validatePackageFields = (fields: PackageRequest) => {
//   validator.name(fields.name);
//   validator.price(fields.price);
//   validator.duration(fields.duration);
// }
//
// export const validateDetailPackageFields = (fields: DetailPackageRequest) => {
//   validator.number(fields.package_id);
//   validator.name(fields.description);
// }
//
// export const validateTransactionFields = (fields: TransactionRequest) => {
//   validator.username(fields.username)
//   validator.email(fields.email)
//   validator.password(fields.password)
//   validator.number(fields.package_id)
//   validator.string(fields.payment_method)
// }
//
// export const validateCheckFields = (fields: any) => {
//   validator.username(fields.key)
//   validator.username(fields.value)
// }
