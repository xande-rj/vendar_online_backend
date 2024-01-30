import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { loginDto } from './dtos/Login.dto';
import { ReturnUserDTO } from 'src/user/dtos/ReturnUser';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}
    
    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() login:loginDto):Promise<ReturnUserDTO>{
        return new ReturnUserDTO(await this.authService.login(login))
    }

}
