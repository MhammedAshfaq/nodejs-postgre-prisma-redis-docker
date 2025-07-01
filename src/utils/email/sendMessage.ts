export async function sendEmail(to: string, subject: string, body: string) {
  console.log(`📧 Sending email to ${to}: ${subject}`);
  console.log("0");
  // integrate nodemailer / SES / sendgrid here
}
