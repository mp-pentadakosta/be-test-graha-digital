import { Injectable } from '@nestjs/common';
import { TodoListRepository } from 'src/repository/todo.list.repository';
import { ResponseSuccess } from '../core/dto/response';
import { CustomHttpException } from '../core/custom.http.exception';
import { errors } from '../error/error';
import { AddTodoListDto } from '../dto/todo.list.dto';

@Injectable()
export class TodoListService {
  constructor(private readonly todoListRepository: TodoListRepository) {}

  async getTodoList(page: number, limit: number) {
    const resp = await this.todoListRepository.getTodoList(page, limit);
    return ResponseSuccess.success({
      listData: resp,
    });
  }

  async getTodoListById(id: number) {
    const resp = await this.todoListRepository.getTodoListById(id);

    if (!resp) {
      throw new CustomHttpException(errors.FAILED_GET_DATA, {
        message: 'Todo list not found',
        description: 'Todo list not found',
      });
    }

    return ResponseSuccess.success({
      data: resp,
    });
  }

  async addTodoList(data: AddTodoListDto) {
    const resp = await this.todoListRepository.addTodoList({
      description: data.description,
      title: data.title,
      groupName: data.groupName,
    });

    if (!resp) {
      throw new CustomHttpException(errors.FAILED_CREATE_DATA, {
        message: 'Failed to add todo list',
        description: 'Failed to add todo list',
      });
    }

    return ResponseSuccess.success({
      data: resp,
    });
  }

  async updateStatus(id: number, status: boolean) {
    const resp = await this.todoListRepository.updateStatus(id, status);

    if (!resp) {
      throw new CustomHttpException(errors.FAILED_UPDATE_DATA, {
        message: 'Failed to update todo list',
        description: 'Failed to update todo list',
      });
    }

    return ResponseSuccess.success({
      data: resp,
    });
  }
}
