import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { loginDto } from './dtos/Login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDTO } from 'src/user/dtos/ReturnUser';
import { ReturnLogin } from './dtos/ReturnLogin.dtos';
import { LoginPayloads } from './dtos/LoginPayloads.dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly useService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: loginDto): Promise<ReturnLogin> {
    const user: UserEntity | undefined = await this.useService
      .findUserByemail(loginDto.email)
      .catch(() => undefined);

    const isMatch = await compare(loginDto.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException(`email or password Invalid`);
    }

    return {
      accessToken: await this.jwtService.signAsync({
        ...new LoginPayloads(user)
      }),
      user: new ReturnUserDTO(user),
    };
  }
}
