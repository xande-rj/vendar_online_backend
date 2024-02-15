import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StateService } from '../state.service';
import { StateEntity } from '../entities/state.entity';
import { StateEntityMock } from '../_mock_/state.mock';

describe('StateService', () => {
  let service: StateService;
  let stateRepository: Repository<StateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide:getRepositoryToken(StateEntity),
          useValue:{
            find :jest.fn().mockResolvedValue(StateEntityMock)
          }
        }
      ],
    }).compile();

    service = module.get<StateService>(StateService);
    stateRepository = module.get<Repository<StateEntity>>(getRepositoryToken(StateEntity))
  });

  it('should be defined', () => { // verifica se existe o repository
    expect(service).toBeDefined();
    expect(stateRepository).toBeDefined();
  });

  it('should return state in getAllStates ', async () => { 
    const state = await service.getAllState()
    expect(state).toEqual(StateEntityMock);
  });

  it('should return erro in getAllStates ', async () => { 
    jest.spyOn(stateRepository,'find').mockRejectedValue(new Error())

    expect(service.getAllState()).rejects.toThrow()

  });

});
