import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex, TableUnique } from "typeorm";

export class CreateTableTeamPokemons1768174403229 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "team_pokemons",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "gen_random_uuid()",
                    },
                    {
                        name: "team_id",
                        type: "uuid",
                    },
                    {
                        name: "pokemon_id",
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
            "team_pokemons",
            new TableForeignKey({
                columnNames: ["team_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "teams",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "team_pokemons",
            new TableForeignKey({
                columnNames: ["pokemon_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "pokemons",
                onDelete: "RESTRICT",
            })
        );

        await queryRunner.createUniqueConstraint(
            "team_pokemons",
            new TableUnique({
                name: "UQ_TEAM_POKEMON",
                columnNames: ["team_id", "pokemon_id"],
            })
        );

        await queryRunner.createIndex("team_pokemons", new TableIndex({
            name: "IDX_TEAM_POKEMON_COMPOSITE",
            columnNames: ["team_id", "pokemon_id"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("team_pokemons");
    }
}