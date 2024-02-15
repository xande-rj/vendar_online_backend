import { UserEntity } from "../entities/user.entity";
import { TypeUser } from "../enum/user.enum";

export const UserEntityMock: UserEntity = {
    cpf: '13352285599',
    created_at : new Date(),
    email: 'user@email.com',
    id: 48485,
    name: 'userr',
    password: 'usermockpassword',
    phone: '181118811',
    typeUser: TypeUser.User,
    updated_at: new Date()

}