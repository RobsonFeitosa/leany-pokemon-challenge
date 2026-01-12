import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './typeorm.config';

@Global()
@Module({
    imports: [TypeOrmModule.forRoot({ ...dataSource.options, autoLoadEntities: true })],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }