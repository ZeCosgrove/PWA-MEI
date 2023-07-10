import { Injectable } from '@nestjs/common';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { User } from './schemas/user.schema';
import { CreateUserOutput } from './entities/create-user-output.entity';
import { GetUserOutput } from './entities/get-user-output.entity';
import { GetUserDetailsOutput } from './entities/get-user-details-output.entity';
import { UserRole } from './enums/user-role.enum';
import { UserSystemState } from './enums/user-system-state.enum';
import { UpdateUserSystemStateDto } from './dto/update-user-system-state.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { LoginUserInputDto } from './dto/login-user-input.dto';
import { RecoverPasswordInputDto } from './dto/recover-password-input.dto';
import { ChangePasswordInputDto } from './dto/change-password-input.dto';
import { Pagination } from '../pagination/interface/pagination.interface';
import { ForbiddenException } from 'src/exception/exception-handler';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async getUsers(page?: string, perPage?: string) {
    let users: User[] = [];

    if (page != undefined && perPage != undefined && +perPage > 0) {
      users = await this.userModel
        .find()
        .skip(+perPage * +page)
        .limit(+perPage);
    } else {
      users = await this.userModel.find().exec();
    }

    var output: GetUserOutput[] = new Array();

    users.forEach(async (user) => {
      const singleUser = new GetUserOutput(
        user._id,
        user.name,
        user.email,
        user.systemState,
      );
      output.push(singleUser);
    });

    let previous = null;
    let next = null;

    if (+page > 0) {
      previous = `http://localhost:3000/api/v1/users?page=${
        +page - 1
      }&perPage=${+perPage}`;
    }
    if (+perPage * +page + +perPage < (await this.userModel.count())) {
      next = `http://localhost:3000/api/v1/users?page=${
        +page + 1
      }&perPage=${+perPage}`;
    }

    var outputPagination: Pagination = {
      object: output,
      previous: previous,
      next: next,
    };

    return outputPagination;
  }

  async getUserById(id: string) {
    const user: User = await this.userModel.findById(id).exec();

    const output = new CreateUserOutput(user._id, user.name, user.email);

    return output;
  }

  async getUsersByRole(role: number): Promise<GetUserOutput[]> {
    const filter = {
      systemState: {
        $in: [
          UserSystemState.Created,
          UserSystemState.Active,
          UserSystemState.Inactive,
        ],
      },
      role: role,
    };

    const users: User[] = await this.userModel.find(filter).exec();

    var output: GetUserOutput[] = new Array();

    users.forEach((user) => {
      const singleUser = new GetUserOutput(user._id, user.name, user.email);
      output.push(singleUser);
    });

    return output;
  }

  async getUserDetails(id: string): Promise<GetUserDetailsOutput> {
    const user: User = await this.userModel.findById(id).exec();

    const output = new GetUserDetailsOutput(
      user._id,
      user.name,
      user.email,
      user.role,
      user.nif,
      user.mobile,
      user.address,
      user.systemState,
    );

    return output;
  }

  async getDeletedUsers(): Promise<GetUserOutput[]> {
    const users: User[] = await this.userModel
      .find({ systemState: UserSystemState.Terminated })
      .exec();

    var output: GetUserOutput[] = new Array();

    users.forEach((user) => {
      const singleUser = new GetUserOutput(user._id, user.name, user.email);
      output.push(singleUser);
    });

    return output;
  }

  async registerUser(input: CreateUserInputDto) {
    const existingUser = await this.userModel
      .find({ email: input.email })
      .exec();

    if (existingUser.length == 0) {
      const createdUser = new this.userModel(input);
      createdUser.role = UserRole.Client;
      createdUser.systemState = UserSystemState.Active;

      const user: User = await createdUser.save();

      const output = new GetUserOutput(user._id, user.name, user.email);

      return output;
    }

    //User exists
    throw new ForbiddenException('User already exists!');
  }

  async updateUser(id: string, input: UpdateUserDto) {
    await this.userModel.updateOne({ _id: id }, input).exec();

    return this.getUserById(id);
  }

  async updateUserSystemState(id: string, input: UpdateUserSystemStateDto) {
    await this.userModel.updateOne({ _id: id }, input).exec();

    return this.getUserById(id);
  }

  async updateUserRole(id: string, input: UpdateUserRoleDto) {
    await this.userModel.updateOne({ _id: id }, input).exec();

    return this.getUserById(id);
  }

  async deleteUser(id: string) {
    const user: User = await this.userModel.findById(id).exec();

    user.systemState = UserSystemState.Terminated;

    await this.userModel.updateOne({ _id: id }, user).exec();

    return this.getUserById(id);
  }

  async loginUser(input: LoginUserInputDto) {
    const user = await this.userModel
      .findOne({ email: input.email, password: input.password })
      .exec();

    if (input.androidToken != null) {
      user.androidToken = input.androidToken;
      await this.userModel.updateOne({ _id: user._id }, user).exec();
    }

    if (user !== null) {
      const payload = { sub: user._id, username: user.name, role: user.role };
      let token = {
        //access_token: await this.jwtService.signAsync(payload),
        access_token: await this.jwtService.signAsync(payload),
      };
      var decodedToken = this.jwtService.decode(token.access_token);
      var expiresIn = decodedToken['exp'] - decodedToken['iat'];

      //return this.getUserById(user._id)
      const output = new CreateUserOutput(
        user._id,
        user.name,
        user.email,
        token.access_token,
        expiresIn,
      );

      return output;
    }

    //User and password dont match
    throw new ForbiddenException("Email and password don't match!");
  }

  async recoverPassword(input: RecoverPasswordInputDto): Promise<string> {
    const user: User = await this.userModel
      .findOne({ email: input.email })
      .exec();

    if (user !== null) {
      let r: string =
        (Math.random() + 1).toString(36).substring(2) +
        (Math.random() + 1).toString(36).substring(2);

      user.password = r;

      await this.userModel.updateOne({ _id: user._id }, user).exec();

      return user.password;
    }

    //Email not found
    throw new ForbiddenException('Email not found!');
  }

  async changePassword(input: ChangePasswordInputDto) {
    const user: User = await this.userModel
      .findOne({ email: input.email, password: input.oldPassword })
      .exec();

    if (user !== null) {
      user.password = input.newPassword;
      await this.userModel.updateOne({ _id: user._id }, user).exec();

      return this.getUserById(user._id);
    }

    //User and password dont match
    throw new ForbiddenException("Email and password don't match!");
  }
}
