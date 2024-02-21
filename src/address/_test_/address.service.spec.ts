import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../../user/user.service';
import { CityService } from '../../city/city.service';
import { AddressEntity } from '../entities/address.entity';
import { AddressService } from '../address.service';
import { CityEntityMock } from '../../city/_mock_/city.mock';
import { AddressEntityMock } from '../_mock_/address.mock';
import { UserEntityMock } from '../../user/_mock_/user.mock';
import { CreateAddressMock } from '../_mock_/create-address.mock';



describe('AddressService', () => {
  let service: AddressService;
  let userservice: UserService;
  let cityservice: CityService;
  let AddressRepository: Repository<AddressEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide:getRepositoryToken(AddressEntity),
          useValue:{
            save :jest.fn().mockResolvedValue(AddressEntityMock)
          }
        },
        {
          provide:UserService,
          useValue:{
            findUserById :jest.fn().mockResolvedValue(UserEntityMock)
          }
        },
        {
          provide:CityService,
          useValue:{
            findCityById :jest.fn().mockResolvedValue(CityEntityMock)
          }
        }
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userservice = module.get<UserService>(UserService)
    cityservice = module.get<CityService>(CityService)
    AddressRepository = module.get<Repository<AddressEntity>>(getRepositoryToken(AddressEntity))
  });

  it('should be defined', () => { // verifica se existe o repository
    expect(service).toBeDefined();
    expect(userservice).toBeDefined();
    expect(cityservice).toBeDefined();
    expect(AddressRepository).toBeDefined();
  });

  it('should return address after the save', async () => { // verifica se existe o repository
    const address = await service.createAddress(
      CreateAddressMock,
      UserEntityMock.id
    )
    expect(address).toEqual(AddressEntityMock); 
  });

  it('should return erro if expection in userservice', async () => { // verifica se existe o repository
    jest.spyOn(userservice,'findUserById').mockRejectedValue(new Error())
    expect(service.createAddress(CreateAddressMock,UserEntityMock.id)).rejects.toThrow()
  });

  it('should return erro if expection in cityservice', async () => { // verifica se existe o repository
    jest.spyOn(cityservice,'findCityById').mockRejectedValue(new Error())
    expect(service.createAddress(CreateAddressMock,UserEntityMock.id)).rejects.toThrow()
  });

});
