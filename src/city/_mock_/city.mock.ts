import { StateEntityMock } from '../../state/_mock_/state.mock';
import { CityEntity } from '../entities/city.entity';

export const CityEntityMock: CityEntity = {
  id: 15,
  stateId: 5,
  name: 'stringnumber',
  state: StateEntityMock,
  created_at: new Date(),
  updated_at: new Date(),
};
