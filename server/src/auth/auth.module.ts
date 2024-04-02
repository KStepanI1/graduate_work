import { UsersModule } from 'src/users/users.module';
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { TokenModule } from 'src/token/token.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [forwardRef(() => UsersModule), TokenModule],
  exports: [AuthService],
})
export class AuthModule {}
