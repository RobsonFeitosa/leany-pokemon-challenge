import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateTrainerDto {
    @ApiProperty({ example: 'Ash Ketchum' })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @ApiProperty({ example: 'ash@pokemon.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '12345-678' })
    @IsString()
    @IsNotEmpty()
    cep: string;

    @ApiProperty({ example: 'Pallet Town St' })
    @IsString()
    @IsOptional()
    street?: string;

    @ApiProperty({ example: 'Central' })
    @IsString()
    @IsOptional()
    neighborhood?: string;

    @ApiProperty({ example: 'Pallet Town' })
    @IsString()
    @IsOptional()
    city?: string;

    @ApiProperty({ example: 'Kanto' })
    @IsString()
    @IsOptional()
    state?: string;
}
