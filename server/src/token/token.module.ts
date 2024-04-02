import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Token } from './token.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles-auth.guard';
@Module({
  providers: [TokenService, JwtAuthGuard, RolesGuard],
  imports: [
    SequelizeModule.forFeature([User, Token]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SERCET || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [TokenService, JwtModule],
})
export class TokenModule {}
