import { ClientProxy } from '@nestjs/microservices';
import { RabbitMQProvider } from './rabbit-mq-provider';

describe('RabbitMQProvider', () => {
    let provider: RabbitMQProvider;
    let clientProxy: ClientProxy;

    beforeEach(() => {
        clientProxy = {
            emit: jest.fn(),
        } as unknown as ClientProxy;

        provider = new RabbitMQProvider(clientProxy);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });

    describe('publish', () => {
        it('should call client.emit with correct parameters', async () => {
            const topic = 'test-topic';
            const payload = { data: 'test-payload' };

            await provider.publish(topic, payload);

            expect(clientProxy.emit).toHaveBeenCalledWith(topic, payload);
        });
    });
});
