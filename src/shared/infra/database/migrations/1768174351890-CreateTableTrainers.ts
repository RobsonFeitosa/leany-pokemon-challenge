import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateTableTrainers1768174351890 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "trainers",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "gen_random_uuid()",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "cep",
                        type: "varchar",
                    },
                    {
                        name: "street",
                        type: "varchar",
                    },
                    {
                        name: "neighborhood",
                        type: "varchar",
                    },
                    {
                        name: "city",
                        type: "varchar",
                    },
                    {
                        name: "state",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                ],
            })
        );

        await queryRunner.createIndex("trainers", new TableIndex({
            name: "IDX_TRAINER_EMAIL",
            columnNames: ["email"]
        }));

        await queryRunner.createIndex("trainers", new TableIndex({
            name: "IDX_TRAINER_SOFT_DELETE",
            columnNames: ["deleted_at"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("trainers");
    }
}