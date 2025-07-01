import { Worker } from "bullmq";
import connection from '../bullmq.connection';
import { QUEUE_NAMES, JOB_NAMES } from "../../constants/job.constants";
import { handleEmailJob } from "./email.job";

console.log("📨 Email worker started");
console.log("👂 Worker listening on:", QUEUE_NAMES.EMAIL);

const emailWorker = new Worker(
  QUEUE_NAMES.EMAIL,
  async (job) => {
    console.log("📥 Job received:", job.name, job.data);
    if (job.name === JOB_NAMES.SEND_EMAIL) {
      await handleEmailJob(job.data);
    }
  },
  {
    connection,
    concurrency: 5,
  }
);

emailWorker.on("completed", (job) =>
  console.log(`✅ Email Job ${job.id} completed`)
);

emailWorker.on("failed", (job, err) =>
  console.error(`❌ Job ${job?.id} failed: ${err.message}`)
);
