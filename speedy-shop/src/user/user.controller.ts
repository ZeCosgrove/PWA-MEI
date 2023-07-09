import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserSystemStateDto } from './dto/update-user-system-state.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { LoginUserInputDto } from './dto/login-user-input.dto';
import { RecoverPasswordInputDto } from './dto/recover-password-input.dto';
import { ChangePasswordInputDto } from './dto/change-password-input.dto';
import { AuthGuard } from './auth/auth.guard';
import { Roles } from './auth/roles.decorator';
import { UserRole } from './enums/user-role.enum';
import { ApiBody } from '@nestjs/swagger';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query() queryParam) {
    var page = queryParam['page'];
    var perPage = queryParam['perPage'];
    return this.userService.getUsers(page, perPage);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('systemState/deleted')
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff)
  getDeletedUsers() {
    return this.userService.getDeletedUsers();
  }

  @Get('role/:id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff)
  getUsersByRole(@Param('id') role: number) {
    return this.userService.getUsersByRole(role);
  }

  @Get('details/:id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff, UserRole.Client)
  getUserDetails(@Param('id') id: string) {
    return this.userService.getUserDetails(id);
  }

  @Post('register')
  @ApiBody({ type: CreateUserInputDto })
  registerUser(@Body() createUserDto: CreateUserInputDto) {
    return this.userService.registerUser(createUserDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff, UserRole.Client)
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Patch('systemState/update/:id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin)
  updateUserSystemState(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserSystemStateDto,
  ) {
    return this.userService.updateUserSystemState(id, updateUserDto);
  }

  @Patch('role/update/:id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin)
  updateUserRole(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRoleDto,
  ) {
    return this.userService.updateUserRole(id, updateUserDto);
  }

  @Get('delete/:id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Post('login')
  loginUser(@Body() createUserDto: LoginUserInputDto) {
    return this.userService.loginUser(createUserDto);
  }

  @Post('password-recovery')
  recoverPassword(@Body() createUserDto: RecoverPasswordInputDto) {
    return this.userService.recoverPassword(createUserDto);
  }

  @Post('change-password')
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff, UserRole.Client)
  changePassword(@Body() createUserDto: ChangePasswordInputDto) {
    return this.userService.changePassword(createUserDto);
  }
}
