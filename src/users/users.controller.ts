import { Body, Controller, Get, Param, Patch, Post, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserPasswordDto } from 'src/dto/update-user-password.dto';
import { UpdateUserWizardDto } from 'src/dto/update-user-wizard.dto';
import { User } from 'src/schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe({ groups: ['wizard'] }))
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
  


  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User> {
    return this.usersService.findOne(username);
  }

  @Patch(':username/password')
  async updatePassword(
    @Param('username') username: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto
  ): Promise<User> {
    return this.usersService.updatePassword(username, updateUserPasswordDto);
  }

  @Patch(':username/wizard')
  async updateWizard(
    @Param('username') username: string,
    @Body() updateUserWizardDto: UpdateUserWizardDto
  ): Promise<User> {
    return this.usersService.updateWizard(username, updateUserWizardDto);
  }

  @Delete(':username')
  async disable(@Param('username') username: string): Promise<User> {
    return this.usersService.disable(username);
  }
}
