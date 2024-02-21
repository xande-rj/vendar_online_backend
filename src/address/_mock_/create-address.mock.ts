import { CityEntityMock } from '../../city/_mock_/city.mock';
import { CreateAddressDto } from '../dtos/createAddress.dto';
import { AddressEntityMock } from './address.mock';

export const CreateAddressMock: CreateAddressDto = {
  complement:AddressEntityMock.complement ,
  numberAddress:CityEntityMock.id,
  cep:AddressEntityMock.cep,
  cityId:AddressEntityMock.cityId,
};
