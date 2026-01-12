import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateTeamUseCase } from "../../../application/create-team.use-case";
import { IndexTeamUseCase } from "../../../application/index-team.use-case";
import { AddPokemonToTeamUseCase } from "../../../application/add-pokemon-to-team.use-case";
import { CreateTeamDto } from "../dtos/create-team.dto";
import { AddPokemonDto } from "../dtos/add-pokemon.dto";

@ApiTags('teams')
@Controller('teams')
export class TeamController {
    constructor(
        private readonly createTeamUseCase: CreateTeamUseCase,
        private readonly indexTeamUseCase: IndexTeamUseCase,
        private readonly addPokemonToTeamUseCase: AddPokemonToTeamUseCase,
    ) { }

    @Post(':id/pokemons')
    @ApiOperation({ summary: 'Add a pokemon to a team' })
    @ApiResponse({ status: 200, description: 'The pokemon has been successfully added to the team.' })
    @ApiResponse({ status: 400, description: 'Team is full or pokemon already in team.' })
    async addPokemon(@Param('id') id: string, @Body() payload: AddPokemonDto) {
        return this.addPokemonToTeamUseCase.execute(id, payload.pokemonIdOrName);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new team' })
    @ApiResponse({ status: 201, description: 'The team has been successfully created.' })
    async create(@Body() payload: CreateTeamDto) {
        return this.createTeamUseCase.execute(payload);
    }

    @Get('trainer/:trainer_id')
    @ApiOperation({ summary: 'List teams by trainer' })
    @ApiResponse({ status: 200, description: 'Return a list of teams.' })
    async findAllByTrainer(@Param('trainer_id') trainer_id: string) {
        return this.indexTeamUseCase.execute(trainer_id);
    }
}
