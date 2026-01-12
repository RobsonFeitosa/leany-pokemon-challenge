import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatePokemonUseCase } from "../../../application/create-pokemon.use-case";
import { IndexPokemonUseCase } from "../../../application/index-pokemon.use-case";
import { SyncPokemonUseCase } from "../../../application/sync-pokemon.use-case";
import { SyncAllPokemonsUseCase } from "../../../application/sync-all-pokemons.use-case";
import { CreatePokemonDto } from "../dtos/create-pokemon.dto";

@ApiTags('pokemons')
@Controller('pokemons')
export class PokemonController {
    constructor(
        private readonly createPokemonUseCase: CreatePokemonUseCase,
        private readonly indexPokemonUseCase: IndexPokemonUseCase,
        private readonly syncPokemonUseCase: SyncPokemonUseCase,
        private readonly syncAllPokemonsUseCase: SyncAllPokemonsUseCase,
    ) { }

    @Post('sync/all')
    @ApiOperation({ summary: 'Sync all pokemons in database from PokeAPI' })
    @ApiResponse({ status: 200, description: 'All pokemons have been successfully synced.' })
    async syncAll() {
        return this.syncAllPokemonsUseCase.execute();
    }

    @Post('sync/:idOrName')
    @ApiOperation({ summary: 'Sync pokemon from PokeAPI' })
    @ApiResponse({ status: 200, description: 'The pokemon has been successfully synced.' })
    async sync(@Param('idOrName') idOrName: string) {
        return this.syncPokemonUseCase.execute(idOrName, true);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new pokemon' })
    @ApiResponse({ status: 201, description: 'The pokemon has been successfully created.' })
    async create(@Body() payload: CreatePokemonDto) {
        return this.createPokemonUseCase.execute(payload);
    }

    @Get()
    @ApiOperation({ summary: 'List pokemons' })
    @ApiResponse({ status: 200, description: 'Return a list of pokemons.' })
    async findAll() {
        return this.indexPokemonUseCase.execute();
    }
}
