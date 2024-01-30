import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { loginDto } from './dtos/Login.dto';
import { AuthService } from './auth.service';
import { ReturnLogin } from './dtos/ReturnLogin.dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() login: loginDto): Promise<ReturnLogin> {
    return this.authService.login(login);
  }
}
