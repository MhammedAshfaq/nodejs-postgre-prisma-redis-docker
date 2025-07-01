import { sendEmail } from "../../../utils/email/sendMessage";

export async function handleEmailJob({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: any;
}) {
  console.log("📨 handleEmailJob called with:", { to, subject });
  await sendEmail(to, subject, body);
}
