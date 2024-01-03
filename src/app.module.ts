import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { AddressModule } from './address/address.module';
import { CityModule } from './city/city.module';
import { StateModule } from './state/state.module';
import { StateEntity } from './state/entities/state.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: ['.env.development.local'],
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    entities:[UserEntity,StateEntity],
    logging: true,
    migrations: [`${__dirname}/migration/{.ts,*.js}`],
    migrationsRun: true
  })
  ,UserModule, AddressModule, CityModule, StateModule,

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
