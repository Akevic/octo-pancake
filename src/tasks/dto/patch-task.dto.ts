import { TaskStatus } from '../task.model';
import { ApiModelProperty } from '@nestjs/swagger';
export class PatchTaskDto {
  @ApiModelProperty()
  status: TaskStatus
}
