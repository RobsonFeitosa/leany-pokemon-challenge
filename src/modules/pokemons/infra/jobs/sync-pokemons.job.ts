import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import type { IMessageBrokerProvider } from 'src/shared/infra/http/providers/message-broker-provider/models/i-message-broker-provider';

@Injectable()
export class SyncPokemonsJob {
    constructor(
        @Inject('MESSAGE_BROKER_PROVIDER')
        private readonly messageBroker: IMessageBrokerProvider,
    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleCron() {
        console.log('--- CRON TRIGGER: SYNC ALL POKEMONS ---');
        await this.messageBroker.publish('sync_all_pokemons', {});
    }
}
