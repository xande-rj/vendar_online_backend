import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CityService } from '../city.service';
import { CityEntity } from '../entities/city.entity';
import { CacheService } from '../../cache/cache.service';
import { CityEntityMock } from '../_mock_/city.mock';


describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide:getRepositoryToken(CityEntity),
          useValue:{
            findOne :jest.fn().mockResolvedValue(CityEntityMock)
          }
        },
        {
          provide:CacheService,
          useValue:{
            getCache :jest.fn().mockResolvedValue([CityEntityMock])
          }
        }
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(getRepositoryToken(CityEntity))
  });

  it('should be defined', () => { // verifica se existe o repository
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return city in findCityById', async () => { 
    const city = await service.findCityById(CityEntityMock.id)
    expect(city).toEqual(CityEntityMock);
  });

  it('should return error in findCityById',async () => { // true se o retorno do id der o erro planejado 
    jest.spyOn(cityRepository,'findOne').mockResolvedValue(undefined)
    expect(service.findCityById(CityEntityMock.id)).rejects.toThrow()
  });

  it('should return error in findCityById(erro DB)',async () => { //Erro no request 
    jest.spyOn(cityRepository,'findOne').mockRejectedValue(new Error())
    expect(service.findCityById(CityEntityMock.id)).rejects.toThrow()
  });

  it('should return city in getallcitybiId', async () => { 
    const city = await service.getallcitybiId(CityEntityMock.id)
    expect(city).toEqual([CityEntityMock]);
  });

});
