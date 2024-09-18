import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UsersTable1726688291072 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_entity',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'text',
            isNullable: false,
          },
        ],
      }),
    );
  }

  async down(_queryRunner: QueryRunner): Promise<void> {}
}
