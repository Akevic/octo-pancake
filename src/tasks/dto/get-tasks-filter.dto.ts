import { TaskStatus } from '../task.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class GetTasksFilterDto {
  @ApiModelProperty()
  status: TaskStatus

  @ApiModelProperty()
  search: string
}
