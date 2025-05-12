import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { CustomHttpException } from '../core/custom.http.exception';
import { errors } from '../error/error';
import { Prisma, Role, User } from '@prisma/client';
import { RegisterReqDto } from '../dto/auth.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        phoneNumber: phoneNumber,
      },
    });
  }

  async getAllUser(page: number, limit: number): Promise<User[]> {
    return this.prismaService.user.findMany({
      where: {
        deletedAt: null,
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        updatedAt: Prisma.SortOrder.desc,
      },
    });
  }

  async createUser(data: RegisterReqDto): Promise<User> {
    try {
      return await this.prismaService.user.create({
        data: {
          name: data.fullName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          password: data.password,
          role: Role.USER,
        },
      });
    } catch (error: any) {
      throw new CustomHttpException(errors.FAILED_CREATE_DATA, {
        message: error.message,
        description: error.message,
      });
    }
  }

  async upsertUser(data: {
    id?: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;
    dob: Date;
    address?: string;
  }): Promise<User> {
    try {
      return await this.prismaService.user.upsert({
        where: {
          id: data.id ?? 0,
        },
        update: {
          name: data.fullName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          password: data.password,
          dob: data.dob,
          address: data.address,
        },
        create: {
          name: data.fullName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          password: data.password,
          dob: data.dob,
          address: data.address,
          role: Role.USER,
        },
      });
    } catch (error: any) {
      throw new CustomHttpException(
        data.id ? errors.FAILED_UPDATE_DATA : errors.FAILED_CREATE_DATA,
        {
          description: error.message,
        },
      );
    }
  }

  async findByUserTokenId(id: number): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async getSearch(search: string): Promise<User[]> {
    return this.prismaService.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            phoneNumber: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
        deletedAt: null,
      },
    });
  }

  async updateUser(
    id: number,
    data: {
      fullName: string;
      phoneNumber: string;
      email: string;
      dob: Date;
      avatar?: string;
      address: string;
    },
  ): Promise<User> {
    return this.prismaService.user
      .update({
        where: { id },
        data: {
          name: data.fullName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          dob: data.dob,
          avatar: data.avatar,
          address: data.address,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        throw new CustomHttpException(errors.FAILED_UPDATE_DATA, {
          description: e.message,
        });
      });
  }

  async updatePassword(id: number, password: string): Promise<User> {
    return this.prismaService.user
      .update({
        where: { id },
        data: {
          password: password,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        throw new CustomHttpException(errors.FAILED_UPDATE_DATA, {
          description: e.message,
        });
      });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prismaService.user
      .update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        throw new CustomHttpException(errors.FAILED_DELETE_DATA, {
          description: e.message,
        });
      });
  }
}
