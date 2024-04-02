import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() authDto: AuthDto, @Res({ passthrough: true }) res) {
    const resData = await this.authService.login(authDto);

    res.cookie('refreshToken', resData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      hhtpOnly: true,
    });

    return resData;
  }

  @Post('/registration')
  async registration(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res,
  ) {
    const resData = await this.authService.registration(userDto);

    res.cookie('refreshToken', resData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      hhtpOnly: true,
    });

    return resData;
  }

  @Post('/logout')
  async logut(@Req() req, @Res({ passthrough: true }) res) {
    const { refreshToken } = req.cookies;

    const resData = await this.authService.logout(refreshToken);

    res.clearCookie('refreshToken');

    return resData;
  }

  @Get('/refresh')
  async refresh(@Req() req, @Res({ passthrough: true }) res) {
    const { refreshToken } = req.cookies;

    const resData = await this.authService.refresh(refreshToken);

    res.cookie('refreshToken', resData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      hhtpOnly: true,
    });

    return resData;
  }
}
