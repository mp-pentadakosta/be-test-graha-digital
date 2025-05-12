import { UserRepository } from './user.repository';
import { TodoListRepository } from './todo.list.repository';

export const appModuleRepository: any[] = [UserRepository, TodoListRepository];
