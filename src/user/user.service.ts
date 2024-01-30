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

  async findUserByemail(email: string): Promise<UserEntity> {
    const user = await this.useRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`User Email: ${email} not found`);
    }
    return user;
  }


  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.useRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User Id: ${userId} not found`);
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
