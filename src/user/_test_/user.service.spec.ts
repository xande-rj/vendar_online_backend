import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntityMock } from '../_mock_/user.mock';
import { createUserMock } from '../_mock_/Createuser.mock';

describe('UserService', () => {
  let service: UserService;
  let useRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide:getRepositoryToken(UserEntity),
          useValue:{
            findOne :jest.fn().mockResolvedValue(UserEntityMock),
            save :jest.fn().mockResolvedValue(UserEntityMock),
          }
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    useRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
  });

  it('should be defined', () => { // verifica se existe o repository
    expect(service).toBeDefined();
    expect(useRepository).toBeDefined();
  });

  it('should return user in findByEmail',async () => { // true se o retorno do email for o mesmo do mock
    const user = await service.findUserByemail(UserEntityMock.email)
    expect(user).toEqual(UserEntityMock);
  });

  it('should return error in findByEmail',async () => { // true se o retorno do email der erro planejado 
    jest.spyOn(useRepository,'findOne').mockResolvedValue(undefined)
    expect(service.findUserByemail(UserEntityMock.email)).rejects.toThrow()
  });

  it('should return error in findByEmail(erro DB)',async () => { //Erro no request 
    jest.spyOn(useRepository,'findOne').mockRejectedValue(new Error())
    expect(service.findUserByemail(UserEntityMock.email)).rejects.toThrow()
  });

  it('should return user in findUserById',async () => { // true se o retorno do id for o mesmo do mock
    const user = await service.findUserById(UserEntityMock.id)
    expect(user).toEqual(UserEntityMock);
  });

  it('should return error in findUserById',async () => { // true se o retorno do id der o erro planejado 
    jest.spyOn(useRepository,'findOne').mockResolvedValue(undefined)
    expect(service.findUserById(UserEntityMock.id)).rejects.toThrow()
  });

  it('should return error in findUserById(erro DB)',async () => { //Erro no request 
    jest.spyOn(useRepository,'findOne').mockRejectedValue(new Error())
    expect(service.findUserById(UserEntityMock.id)).rejects.toThrow()
  });

  it('should return user in getUserByIdRelation',async () => { // retorna a relacao com base no id 
    const user = await service.getUserByIdRelation(UserEntityMock.id)
    expect(user).toEqual(UserEntityMock);
  });

  it('should return user if user not exist ',async () => { // retorna a relacao com base no id 
    jest.spyOn(useRepository,'findOne').mockResolvedValue(undefined)

    const user = await service.createUser(createUserMock)
    
    expect(user).toEqual(UserEntityMock);
  });
});
