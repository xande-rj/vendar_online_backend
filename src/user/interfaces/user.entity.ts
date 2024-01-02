import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;
  @Column({name:'name',nullable: false})
  name: string;

  @Column({name:'email',nullable: false})
  email: string;

  @Column({name:'phone'})
  phone: string;


  @Column({name:'cpf',nullable: false})
  cpf: string;

  @Column({name:'password',nullable: false})
  password: string;
}
