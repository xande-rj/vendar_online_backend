import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserdto } from './dtos/createUser.dto';

@Controller('user')
export class UserController {
    @Post()
    async createruser (@Body() createruser: CreateUserdto){
        return {
            ...createruser,
            password:undefined,
        }
    }
}
