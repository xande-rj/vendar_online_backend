import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserdto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}/*criando o service*/

  @Post()
  async createrUser(@Body() createrUser: CreateUserdto):Promise<UserEntity> {
    return this.userService.createUser(createrUser/*enviando as infomacoes para o service*/);
  }


  @Get()
 async getAll():Promise<UserEntity[]>{
    return this.userService.getAll()
 } 
}
