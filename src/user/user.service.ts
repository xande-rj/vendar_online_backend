import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserdto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
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
      typeUser: 1,
      password: passwordhash,
    });
  }

  async getAll(): Promise<UserEntity[]> {
    return this.useRepository.find();
  }

  async findUserById(userid: number): Promise<UserEntity> {
    const user = await this.useRepository.findOne({
      where: {
        id: userid,
      },
    });

    if (!user) {
      throw new NotFoundException(`User id: ${userid} not found`);
    }
    return user;
  }

  async getUserByIdRelation(userId: number) {
    return this.useRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }
}
