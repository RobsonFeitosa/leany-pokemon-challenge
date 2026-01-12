import { Body, Controller, Delete, Get, Param, Post, } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateTrainerUseCase } from "../../../application/create-trainer.use-case";
import { IndexTrainerUseCase } from "../../../application/index-trainer.use-case";
import { DeleteTrainerUseCase } from "../../../application/delete-trainer.use-case";
import { GetCepAddressUseCase } from "../../../application/get-cep-address.use-case";
import { CreateTrainerDto } from "../dtos/create-trainer.dto";

@ApiTags('trainers')
@Controller('trainers')
export class TrainerController {
    constructor(
        private readonly createTrainerUseCase: CreateTrainerUseCase,
        private readonly indexTrainerUseCase: IndexTrainerUseCase,
        private readonly deleteTrainerUseCase: DeleteTrainerUseCase,
        private readonly getCepAddressUseCase: GetCepAddressUseCase,
    ) { }

    @Get('address/:cep')
    @ApiOperation({ summary: 'Get address from CEP' })
    @ApiResponse({ status: 200, description: 'Return address data.' })
    @ApiResponse({ status: 400, description: 'Invalid CEP.' })
    async getAddress(@Param('cep') cep: string) {
        return this.getCepAddressUseCase.execute(cep);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a trainer' })
    @ApiResponse({ status: 200, description: 'The trainer has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Trainer not found.' })
    async delete(@Param('id') id: string) {
        return this.deleteTrainerUseCase.execute(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new trainer' })
    @ApiResponse({ status: 201, description: 'The trainer has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Trainer already exists.' })
    async create(@Body() payload: CreateTrainerDto) {
        return this.createTrainerUseCase.execute(payload);
    }

    @Get()
    @ApiOperation({ summary: 'List trainers' })
    @ApiResponse({ status: 200, description: 'Return a list of trainers.' })
    async findAll() {
        return this.indexTrainerUseCase.execute();
    }
}
