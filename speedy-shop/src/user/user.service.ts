import { Injectable } from '@nestjs/common';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema'

import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';



@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(input: CreateUserInputDto): Promise<User> {
    const createdUser = new this.userModel(input);
    return await createdUser.save();
  }

//   findAll(@Res() res: Response) {
//     res.status(HttpStatus.OK).json([]);
//  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec()
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
