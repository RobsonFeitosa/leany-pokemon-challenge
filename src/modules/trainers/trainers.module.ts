import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerController } from './infra/http/controllers/trainer.controller';
import { TrainerEntity } from './infra/database/entities/trainer.entity';
import { TypeOrmTrainerRepository } from './infra/database/repositories/typeorm-trainer.repository';
import { CreateTrainerUseCase } from './application/create-trainer.use-case';
import { IndexTrainerUseCase } from './application/index-trainer.use-case';
import { DeleteTrainerUseCase } from './application/delete-trainer.use-case';
import { GetCepAddressUseCase } from './application/get-cep-address.use-case';
import { ViaCepProvider } from './infra/providers/cep/via-cep.provider';
import { TeamsModule } from '../teams/teams.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TrainerEntity]),
        TeamsModule,
    ],
    controllers: [TrainerController],
    providers: [
        CreateTrainerUseCase,
        IndexTrainerUseCase,
        DeleteTrainerUseCase,
        GetCepAddressUseCase,
        {
            provide: 'TrainerRepository',
            useClass: TypeOrmTrainerRepository,
        },
        {
            provide: 'CepProvider',
            useClass: ViaCepProvider,
        },
    ],
    exports: ['TrainerRepository', GetCepAddressUseCase],
})
export class TrainersModule { }
