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

    @ApiProperty({ example: ['uuid-pokemon1', 'uuid-pokemon2'], description: 'List of pokemon IDs (max 6)' })
    @IsArray()
    @IsUUID(undefined, { each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(6)
    pokemons: string[];
}
