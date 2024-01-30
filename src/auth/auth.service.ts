import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { loginDto } from './dtos/Login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly useService : UserService){}

    async login(loginDto:loginDto):Promise<UserEntity>{
        const user:UserEntity |undefined = await this.useService.findUserByemail(loginDto.email).catch(()=> undefined)


        const isMatch = await compare(loginDto.password, user?.password || '');

        if(!user|| !isMatch){
            throw new  NotFoundException(`email or password Invalid`);

        }

        return user
    }
}
