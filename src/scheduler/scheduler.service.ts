import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import moment from 'moment-timezone';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  private users = [
    {
      name: 'Lanz',
      email: 'Lanzruizdesigns@gmail.com',
      timezone: 'Asia/Manila',
    },
    {
      name: 'John',
      email: 'john@newyorkcity.com',
      timezone: 'America/New_York',
    },
    {
      name: 'Ken',
      email: 'ken@newzealander.com',
      timezone: 'Pacific/Auckland',
    },
    {
      name: 'Lloyd',
      email: 'Lloyd@australiancorndbeef.com',
      timezone: 'Australia/Sydney',
    },
    {
      name: 'Grahmn',
      email: 'Grahmn@australiancorndbeef.com',
      timezone: 'Australia/Melbourne',
    },
  ];

  @Cron('45 * * * * *')
  handleCron() {
    const nowUTC = moment.utc();
    this.logger.log(
      `Checking scheduled emails at UTC ${nowUTC.format('HH:mm')}...`,
    );

    for (const user of this.users) {
      // Get the user's current local hour/minute
      const localTime = nowUTC.clone().tz(user.timezone);
      const localHour = localTime.hour();
      const localMinute = localTime.minute();

      // Condition: send at exactly 9:00 AM local time
      if (localHour === 9 && localMinute < 10) {
        this.logger.debug(`Birth Day email sent to ${user.email}`);
      }
    }
  }
}
