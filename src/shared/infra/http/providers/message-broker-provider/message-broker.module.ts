import { Global, Module, DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQProvider } from './implementations/rabbit-mq-provider';



@Global()
@Module({})
export class MessageBrokerModule {
    static register(): DynamicModule {
        return {
            module: MessageBrokerModule,
            imports: [
                ClientsModule.register([
                    {
                        name: 'RABBITMQ_SERVICE',
                        transport: Transport.RMQ,
                        options: {
                            urls: [process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672'],
                            queue: 'main_queue',
                            queueOptions: { durable: true },
                        },
                    },
                ]),
            ],
            providers: [
                {
                    provide: 'MESSAGE_BROKER_PROVIDER',
                    useClass: RabbitMQProvider,
                },
            ],
            exports: [ClientsModule, 'MESSAGE_BROKER_PROVIDER'],
        };
    }
}