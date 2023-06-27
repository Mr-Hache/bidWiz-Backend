import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { MongooseModule } from '@nestjs/mongoose';



@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://gerald:gerald@cluster0.vpqricn.mongodb.net/bidwizdb?retryWrites=true&w=majority&ssl=true'), UsersModule, JobsModule],
  
})
export class AppModule {}
