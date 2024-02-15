import { Injectable, NotFoundException } from '@nestjs/common';
import { StateEntity } from './entities/state.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {}

  async getAllState(): Promise<StateEntity[]> {
     const state = await this.stateRepository.find();
      if(!state){
        throw new NotFoundException(`States not found`);
      }
     return state
  }
}
