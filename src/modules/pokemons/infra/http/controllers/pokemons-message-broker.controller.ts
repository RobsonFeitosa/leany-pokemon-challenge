import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SyncAllPokemonsUseCase } from 'src/modules/pokemons/application/sync-all-pokemons.use-case';

@Controller()
export class PokemonsMessageBrokerController {
    constructor(private readonly syncAllPokemons: SyncAllPokemonsUseCase) { }

    @EventPattern('sync_all_pokemons')
    async handleSyncAllPokemons(@Payload() data: any) {
        console.log('--- RABBITMQ CONSUMER: SYNC ALL POKEMONS ---');
        await this.syncAllPokemons.execute();
    }
}
