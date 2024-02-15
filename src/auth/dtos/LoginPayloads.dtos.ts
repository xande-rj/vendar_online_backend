import { UserEntity } from '../../user/entities/user.entity';

export class LoginPayloads {
  id: number;
  typeUser: number;
  constructor(user: UserEntity) {
    this.id = user.id;
    this.typeUser = user.typeUser;
  }
}
