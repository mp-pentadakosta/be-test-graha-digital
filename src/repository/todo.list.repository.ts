import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class TodoListRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getTodoList(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.prismaService.todoList.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getTodoListById(id: number) {
    return this.prismaService.todoList.findUnique({
      where: {
        id: id,
      },
    });
  }

  async addTodoList(data: { title: string; description?: string }) {
    return this.prismaService.todoList.create({
      data: {
        title: data.title,
        description: data.description,
      },
    });
  }

  async updateStatus(id: number, status: boolean) {
    return this.prismaService.todoList.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
  }
}
