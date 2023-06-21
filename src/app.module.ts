import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ReviewsModule } from './reviews/reviews.module';
//import { JobsModule } from './jobs/jobs.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://gerald:gerald@cluster0.vpqricn.mongodb.net/bidwizdb?retryWrites=true&w=majority&ssl=true'), AdminModule, UsersModule, AuthModule, ReviewsModule, ],
  
})
export class AppModule {}
