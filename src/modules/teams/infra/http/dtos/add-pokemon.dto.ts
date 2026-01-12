import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddPokemonDto {
    @ApiProperty({ example: 'pikachu', description: 'Pokemon name or PokeAPI ID' })
    @IsNotEmpty()
    pokemonIdOrName: string | number;
}
