import { ReturnCityDto } from '../../city/dtos/ReturnCity.dtos';
import { AddressEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  complement: string;

  numberAddress: number;

  cep: string;
  city?: ReturnCityDto;
  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.cep = address.cep;
    this.numberAddress = address.numberAddress;
    this.city = address.city ? new ReturnCityDto(address.city) : undefined;
  }
}
