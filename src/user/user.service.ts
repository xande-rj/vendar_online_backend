import { Injectable } from '@nestjs/common';
import { CreateUserdto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly useRepository: Repository<UserEntity>,
  ) {}
  async createUser(
    createruserdto /*recebendo as infomacoes do controller*/ : CreateUserdto,
  ): Promise<UserEntity> {
    const saltOrRounds = 10;

    const passwordhash = await hash(createruserdto.password, saltOrRounds);

    return this.useRepository.save({
      ...createruserdto,
      typeUser:1,
      password: passwordhash,
    });
  }


  async getAll(): Promise<UserEntity[]> {
    return this.useRepository.find();
  }
}
