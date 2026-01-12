import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateTablePokemons1768174377816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pokemons",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "gen_random_uuid()",
                    },
                    {
                        name: "poke_api_id",
                        type: "integer",
                        isUnique: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "image_url",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "types",
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
                ],
            })
        );

        await queryRunner.createIndex(
            "pokemons",
            new TableIndex({
                name: "IDX_POKEMON_EXTERNAL_ID",
                columnNames: ["poke_api_id"],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pokemons");
    }
}