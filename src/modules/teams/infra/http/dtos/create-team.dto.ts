import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, IsUUID, ArrayMaxSize, ArrayMinSize } from "class-validator";

export class CreateTeamDto {
    @ApiProperty({ example: 'My Awesome Team' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'uuid-trainer' })
    @IsUUID()
    @IsNotEmpty()
    trainer_id: string;

    @ApiProperty({ example: ['pikachu', 1, 'charizard'], description: 'List of pokemon names or PokeAPI IDs (max 5)' })
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(5)
    pokemons: (string | number)[];
}
