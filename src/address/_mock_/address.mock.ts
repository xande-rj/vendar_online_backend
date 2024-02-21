import { CityEntityMock } from '../../city/_mock_/city.mock';
import { UserEntityMock } from '../../user/_mock_/user.mock';
import { AddressEntity } from '../entities/address.entity';

export const AddressEntityMock: AddressEntity = {
  id: 555,
  userId: UserEntityMock.id,
  complement: 'dada',
  numberAddress: 455,
  cep: '45464',
  cityId: CityEntityMock.id,
  created_at: new Date(),
  updated_at: new Date(),
};
