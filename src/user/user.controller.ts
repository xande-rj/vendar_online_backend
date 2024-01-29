import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserdto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDTO } from './dtos/ReturnUser';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}/*criando o service*/

  @UsePipes(ValidationPipe)
  @Post()
  async createrUser(@Body() createrUser: CreateUserdto):Promise<UserEntity> {
    return this.userService.createUser(createrUser/*enviando as infomacoes para o service*/);
  }


  @Get()
 async getAll():Promise<ReturnUserDTO[]>{
    return (await this.userService.getAll()).map(
      (userEntity)=> new ReturnUserDTO(userEntity),
      )
 } 
}
