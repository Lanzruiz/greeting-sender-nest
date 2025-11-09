import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import moment from 'moment-timezone';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  @Interval(10000)
  async handleInterval() {
    const userSet = await this.userService.findAll();

    this.logger.debug(userSet);

    this.logger.debug('Called every 10 seconds');
    const nowUTC = moment.utc();
    this.logger.log(
      `Checking scheduled emails at UTC ${nowUTC.format('HH:mm')}...`,
    );

    for (const user of userSet) {
      // Get the user's current local hour/minute
      const localTime = nowUTC.clone().tz(user.time_zone);
      const localHour = localTime.hour();
      const localMinute = localTime.minute();

      const birthday = new Date(user.birth_date);
      const today = new Date();

      const isBirthday =
        birthday.getDate() === today.getDate() &&
        birthday.getMonth() === today.getMonth();

      // Condition: send at exactly 9:00 AM local time
      if (localHour === 13 && localMinute < 45 && isBirthday) {
        const userObj = {
          reciever: user.email,
          name: user.first_name,
          userId: user.id,
          subject: 'Happy Birthday!',
          message: `Hey you!, Happy Birthday ${user.first_name}`,
        };

        const emailExisted = await this.emailService.findEmailCreatedById(
          user.id,
        );

        if (!emailExisted) {
          await this.emailService.sendGreetings(userObj, 'bday');

          this.logger.debug(`Birth Day email sent to ${user.email}`);
        }
      }
    }
  }
}
