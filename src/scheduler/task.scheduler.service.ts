import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskSchedulerService {
  private readonly logger = new Logger(TaskSchedulerService.name);

  @Cron(CronExpression.EVERY_MINUTE, {
    name: 'task_scheduler',
  })
  handleCron() {
    this.logger.debug('Running a task every minute using Cron');
  }

  @Cron(CronExpression.EVERY_MINUTE, {
    name: 'task_scheduler',
  })
  handleInterval() {
    this.logger.debug('Running a task every 10 seconds using Interval');
  }

  @Cron(CronExpression.EVERY_MINUTE, {
    name: 'task_scheduler',
  })
  handleTimeout() {
    this.logger.debug('Running a task once after 5 seconds using Timeout');
  }
}
