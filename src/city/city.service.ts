import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheManager :CacheService
  ) {}

  async getallcitybiId(stateId: number): Promise<CityEntity[]> {
    return this.cacheManager.getCache<CityEntity[]>(`state_${stateId}`, () => 
      this.cityRepository.find({
        where: {
          stateId,
        },
      })
    );
  }

  async getall(): Promise<CityEntity[]> {
    return this.cityRepository.find();
  }
}
