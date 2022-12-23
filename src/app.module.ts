import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://datogio:apassfortraderN1@cluster0.jjsez4q.mongodb.net/auction?retryWrites=true&w=majority`,
    ),
    AuthModule,
    UsersModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
