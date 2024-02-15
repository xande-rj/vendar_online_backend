import { ReturnUserDTO } from '../../user/dtos/ReturnUser';

export interface ReturnLogin {
  accessToken: string;
  user: ReturnUserDTO;
}
