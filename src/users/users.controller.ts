import { Body, Controller, Get, Param, Patch, Post, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserWizardDto } from '../dto/update-user-wizard.dto';
import { User } from '../schemas/user.schema';
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
  async findAll(@Query('subjects') subjects: string[], @Query('languages') languages: string[], @Query('sortByReviews') sortByReviews: string, @Query('page') page:number, @Query('size') size:number ) : Promise<User[]> {
    return this.usersService.findAllWizards(subjects, languages, sortByReviews, page, size);
}

@Get('wizards/count')
async countAll(@Query('subjects') subjects: string[], @Query('languages') languages: string[]): Promise<number> {
  return this.usersService.countAllWizards(subjects, languages);
}


  @Get()
  async findAllAdmin(): Promise<User[]> {
    return this.usersService.findAllAdmin();
  }

  @Get("/emails")
  async findAllEmails(): Promise<{ email: string; isDisabled: boolean }[]> {
    return this.usersService.findAllEmails();
  }
  


  @Patch(':_id/wizard')
  async updateWizard(
    @Param('_id') _id: string,
    @Body() updateUserWizardDto: UpdateUserWizardDto
  ): Promise<User> {
    return this.usersService.updateWizard(_id, updateUserWizardDto);
  }

  @Delete(':_id')
  async disable(@Param('_id') _id: string): Promise<User> {
    return this.usersService.disable(_id);
  }

  @Patch('able/:_id')
  async able(@Param('_id') _id: string): Promise<User> {
    return this.usersService.able(_id);
  }

  @Get('/wizard/:_id')
  async findOne(@Param('_id') _id: string): Promise<User> {
    return this.usersService.findOneWizard(_id);
  }

  @Get('/user/:uidFireBase')
  async findOneUid(@Param('uidFireBase') uidFireBase: string): Promise<User> {
    return this.usersService.findOneUserUid(uidFireBase);
  }

  @Get('top-sellers')
    async getTopSellers() {
        const topSellers = await this.usersService.getTopSellers();
        return topSellers;
    }

    @Get('top-wizards')
  async getTopRatedWizards() {
    const wizards = await this.usersService.getTopRatedWizards();
    return wizards;
  }

  @Get('calendar/:_id')
  async getCalendar(@Param('_id') _id: string): Promise<User> {
    const userCalendar = await this.usersService.getCalendar(_id);
    return userCalendar;
  }
}
