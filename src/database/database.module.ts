import { dataSourceOptions } from './data-source';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports: [TypeOrmModule.forRoot({ ...dataSourceOptions })] })
export class DatabaseModule {}
