import { Queue } from 'bullmq';
import connection from '../bullmq.connection';
import { QUEUE_NAMES, JOB_NAMES } from '../../constants/job.constants';

export const emailQueue = new Queue(QUEUE_NAMES.EMAIL, { connection });

export async function queueSendEmail(to: string, subject: string, body: string) {
  console.log("***************");
  console.log(JOB_NAMES.SEND_EMAIL);
  console.log({ to, subject, body });

  const job = await emailQueue.add(
    JOB_NAMES.SEND_EMAIL,
    { to, subject, body },
    {
      attempts: 3,
      removeOnComplete: true,
      removeOnFail: true,
    }
  );

  console.log("📝 Email job added:", job.id);
}
