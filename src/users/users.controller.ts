import { Body, Controller, Get, Param, Patch, Post, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
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
  

  @Get('wizards')
  async findAll(@Query('subjects') subjects: string[], @Query('languages') languages: string[], @Query('page') page:number, @Query('size') size:number ) : Promise<User[]> {

    return this.usersService.findAllWizards(subjects, languages, page, size);
    
}

@Get('wizards/count')
async countAll(@Query('subjects') subjects: string[], @Query('languages') languages: string[]): Promise<number> {
  return this.usersService.countAllWizards(subjects, languages);
}


  @Get()
  async findAllAdmin(): Promise<User[]> {
    return this.usersService.findAllAdmin();
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

  @Get('/wizard/:username')
  async findOne(@Param('username') username: string): Promise<User> {
    return this.usersService.findOneWizard(username);
  }
}
