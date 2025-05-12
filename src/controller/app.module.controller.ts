import { AuthController } from './auth.controller';
import { ProfileController } from './profile.controller';
import { ExampleController } from './example.controller';
import { TodoListController } from './todo.list.controller';

export const appModuleController: any[] = [
  AuthController,
  ProfileController,
  ExampleController,
  TodoListController,
];
