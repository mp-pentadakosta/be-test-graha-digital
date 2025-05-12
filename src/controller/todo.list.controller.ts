import {
  Controller,
  HttpCode,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TodoListService } from '../services/todo.list.service';
import { AddTodoListDto, UpdateTodoListDto } from '../dto/todo.list.dto';

@ApiTags('Todo List Controller')
@ApiBearerAuth('access-token')
@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Get('')
  @HttpCode(200)
  async getData(@Query('page') page: number, @Query('limit') limit: number) {
    if (!page) page = 1;
    if (!limit) limit = 10;
    return this.todoListService.getTodoList(page, limit);
  }

  @Post('add')
  @HttpCode(200)
  async getSearch(@Body() body: AddTodoListDto) {
    return this.todoListService.addTodoList(body);
  }

  @Get('detail/:id')
  @HttpCode(200)
  async getDetail(@Param('id') id: number) {
    return this.todoListService.getTodoListById(id);
  }

  @Put('update-status/:id')
  @HttpCode(200)
  async updateStatus(@Param('id') id: number, @Body() body: UpdateTodoListDto) {
    return this.todoListService.updateStatus(id, body.status);
  }
}
