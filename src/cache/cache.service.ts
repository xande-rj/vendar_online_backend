import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  // j = joker (coringa)
  async getCache<J>(
    key: string,
    functionRequest: () => Promise<J>,
  ): Promise<J> {
    const allData: J = await this.cacheManager.get(key);

    if (allData) {
      return allData;
    }

    const cities: J = await functionRequest();

    await this.cacheManager.set(key, cities);

    return cities;
  }
}
