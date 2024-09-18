import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class NotesTable1726516207659 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'note_entity',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'uuid',
          },
          {
            name: 'content',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'importance',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );
  }

  async down(_queryRunner: QueryRunner): Promise<void> {}
}
