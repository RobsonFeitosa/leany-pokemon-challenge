import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'fcac41078f2abd6c272b8601a8511f0c',
    database: 'bp-nexus',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    migrations: [
        __dirname + '/migrations/*.{ts,js}'
    ],
    migrationsTableName: 'migrations',
    synchronize: true,
});