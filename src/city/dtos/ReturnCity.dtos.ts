import { ReturnStateDto } from '../../state/dtos/ReturnState.dto';
import { CityEntity } from '../entities/city.entity';

export class ReturnCityDto {
  name: string;
  state?: ReturnStateDto;

  constructor(city: CityEntity) {
    this.name = city.name;
    this.state = new ReturnStateDto(city.state);
  }
}
