import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePokemonDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    poke_api_id: number;

    @ApiProperty({ example: 'bulbasaur' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' })
    @IsString()
    @IsOptional()
    image_url?: string;

    @ApiProperty({ example: 'grass,poison' })
    @IsString()
    @IsNotEmpty()
    types: string;
}
