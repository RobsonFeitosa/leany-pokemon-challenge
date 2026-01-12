import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableTeams1768174364129 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "teams",
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
                        name: "trainer_id",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "teams",
            new TableForeignKey({
                columnNames: ["trainer_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "trainers",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("teams");
    }
}