import { Injectable } from '@nestjs/common';
import { CreateUserdto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(
    createruserdto /*recebendo as infomacoes do controller*/ : CreateUserdto,
  ): Promise<User> {
    const saltOrRounds = 10;

    const passwordhash = await hash(createruserdto.password, saltOrRounds);

    const user: User = {
      ...createruserdto,
      id: this.users.length + 1,
      password: passwordhash,
    };

    this.users.push(user);

    return user
  }

  async getAll():Promise<User[]>{
    return this.users
  }
}
