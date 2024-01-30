import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheManager: CacheService,
  ) {}

  async getallcitybiId(stateId: number): Promise<CityEntity[]> {
    return this.cacheManager.getCache<CityEntity[]>(`state_${stateId}`, () =>
      this.cityRepository.find({
        where: {
          stateId,
        },
      }),
    );
  }

  async findCityById(city_id: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: {
        id: city_id,
      },
    });

    if (!city) {
      throw new NotFoundException(`City id: ${city_id} not found`);
    }
    return city;
  }
}
