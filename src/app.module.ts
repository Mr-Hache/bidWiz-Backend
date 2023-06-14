import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ReviewsModule } from './reviews/reviews.module';
import { JobsModule } from './jobs/jobs.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://ohech582:ohech582@cluster0.0cirzr2.mongodb.net/'), AdminModule, UsersModule, AuthModule, ReviewsModule, JobsModule],
  
})
export class AppModule {}
