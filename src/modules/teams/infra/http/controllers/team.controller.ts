import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/shared/infra/http/guards/auth.guard";
import { CreateTeamUseCase } from "../../../application/create-team.use-case";
import { IndexTeamUseCase } from "../../../application/index-team.use-case";
import { CreateTeamDto } from "../dtos/create-team.dto";

@ApiTags('teams')
@Controller('teams')
export class TeamController {
    constructor(
        private readonly createTeamUseCase: CreateTeamUseCase,
        private readonly indexTeamUseCase: IndexTeamUseCase,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new team' })
    @ApiResponse({ status: 201, description: 'The team has been successfully created.' })
    async create(@Body() payload: CreateTeamDto) {
        return this.createTeamUseCase.execute(payload);
    }

    @Get('trainer/:trainer_id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'List teams by trainer' })
    @ApiResponse({ status: 200, description: 'Return a list of teams.' })
    async findAllByTrainer(@Param('trainer_id') trainer_id: string) {
        return this.indexTeamUseCase.execute(trainer_id);
    }
}
