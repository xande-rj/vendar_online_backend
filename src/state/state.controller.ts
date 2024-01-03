import { Controller, Get } from '@nestjs/common';
import { StateEntity } from './entities/state.entity';
import { StateService } from './state.service';

@Controller('state')
export class StateController {
  constructor(
    private readonly StateService: StateService,
  ) {} /*criando o service*/

  @Get()
  async getAllState(): Promise<StateEntity[]> {
    return this.StateService.getAllState();
  }
}
