export interface IMessageBrokerProvider {
    publish(queue: string, payload: any): Promise<void>;
}