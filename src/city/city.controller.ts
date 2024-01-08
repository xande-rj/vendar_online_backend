import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';

@Controller('city')
export class CityController {
    constructor( private readonly cityservice : CityService ) {}

    @Get('/:stateId')
    async getallcitybiId(@Param ('stateId') stateId:number ): Promise<CityEntity[]>{
        return this.cityservice.getallcitybiId(stateId)
    }

    @Get()
    async getall(): Promise<CityEntity[]>{
        return this.cityservice.getall()
    }
}
