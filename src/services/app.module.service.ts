import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { ExampleService } from './example/example.service';

export const appModuleService: any[] = [
  AuthService,
  UserService,
  ExampleService,
];
