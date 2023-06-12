import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LanguagesModule } from './languages/languages.module';
import { ExperienceModule } from './experience/experience.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SubjectsModule } from './subjects/subjects.module';
import { JobsModule } from './jobs/jobs.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/bidwizdb'), AdminModule, UsersModule, AuthModule, LanguagesModule, ExperienceModule, ReviewsModule, SubjectsModule, JobsModule],
  
})
export class AppModule {}
