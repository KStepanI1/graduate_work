import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new BadRequestException(
        'Пользователь с таким номером телефона уже существует',
      );
    }

    const user = await this.userService.create(userDto);
    const tokens = await this.tokenService.generateTokens(
      user.id,
      userDto.email,
      user.roles,
    );
    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }

  async login(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (!user) {
      throw new BadRequestException(
        'Пользователь с таким номером телефона не был найден',
      );
    }

    const tokens = await this.tokenService.generateTokens(
      user.id,
      userDto.email,
      user.roles,
    );

    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }

  async logout(refreshToken: string) {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Не авторизован');
    }

    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.findRefreshToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException('Не авторизован');
    }
    const user = await this.userService.getById(userData.id);
    const tokens = await this.tokenService.generateTokens(
      user.id,
      user.email,
      user.roles,
    );

    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }
}
