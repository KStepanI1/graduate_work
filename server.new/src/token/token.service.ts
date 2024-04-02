import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './token.model';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles/roles.model';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token) private tokenRepository: typeof Token,
    private jwtService: JwtService,
  ) {}

  async generateTokens(userId: number, email: string, roles: Role[]) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email,
          roles,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email,
          roles,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '30d',
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.tokenRepository.findOne({ where: { userId } });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await this.tokenRepository.create({ userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await this.tokenRepository.destroy({
      where: { refreshToken },
    });

    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const tokenData = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      return tokenData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const tokenData = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return tokenData;
    } catch (e) {
      return null;
    }
  }

  async findRefreshToken(refreshToken: string) {
    const tokenData = await this.tokenRepository.findOne({
      where: { refreshToken },
    });
    return tokenData;
  }
}
