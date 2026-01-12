import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IMessageBrokerProvider } from '../models/i-message-broker-provider';

@Injectable()
export class RabbitMQProvider implements IMessageBrokerProvider {
    constructor(
        @Inject('RABBITMQ_SERVICE')
        private readonly client: ClientProxy,
    ) { }

    async publish(topic: string, payload: any): Promise<void> {
        console.log(' publicando', topic, payload);
        this.client.emit(topic, payload);
    }
}