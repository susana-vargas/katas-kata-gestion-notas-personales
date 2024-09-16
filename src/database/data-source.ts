import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: '123456',
  database: 'my_bd',
  migrations: [__dirname + '/../database/migrations/*.ts'],
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
};
export const dataSource = new DataSource(dataSourceOptions);
// migrations: [`${__dirname}/migrations/{*.ts,*.js}`],
// entities: [__dirname + '/../**/*.entity.{js,ts}'], //accede a la entidad
// migrations: [__dirname + '/../database/migrations/*.ts'],
