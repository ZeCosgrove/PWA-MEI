import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserSystemStateDto } from './dto/update-user-system-state.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { LoginUserInputDto } from './dto/login-user-input.dto';
import { RecoverPasswordInputDto } from './dto/recover-password-input.dto';
import { ChangePasswordInputDto } from './dto/change-password-input.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('systemState/deleted')
  getDeletedUsers() {
    return this.userService.getDeletedUsers();
  }

  @Get('role/:id')
  getUsersByRole(@Param('id') role: number) {
    return this.userService.getUsersByRole(role);
  }

  @Get('details/:id')
  getUserDetails(@Param('id') id: string) {
    return this.userService.getUserDetails(id);
  }

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserInputDto) {
    return this.userService.registerUser(createUserDto);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Patch('systemState/update/:id')
  updateUserSystemState(@Param('id') id: string, @Body() updateUserDto: UpdateUserSystemStateDto) {
    return this.userService.updateUserSystemState(id, updateUserDto);
  }

  @Patch('role/update/:id')
  updateUserRole(@Param('id') id: string, @Body() updateUserDto: UpdateUserRoleDto) {
    return this.userService.updateUserRole(id, updateUserDto);
  }

  @Get('delete/:id')
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
  changePassword(@Body() createUserDto: ChangePasswordInputDto) {
    return this.userService.changePassword(createUserDto);
  }
}
