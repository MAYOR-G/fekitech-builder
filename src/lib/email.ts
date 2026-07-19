import "server-only";

import nodemailer from "nodemailer";

type EmailMessage = {
  to: string;
  subject: string;
  text: string;
};

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !Number.isInteger(port) || port <= 0 || !user || !pass) {
    throw new Error("Transactional email is not configured.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    requireTLS: port !== 465,
  });
}

export async function sendTransactionalEmail(message: EmailMessage): Promise<void> {
  const from = process.env.EMAIL_FROM;
  if (!from) throw new Error("EMAIL_FROM is not configured.");

  await getTransport().sendMail({
    from,
    to: message.to,
    subject: message.subject,
    text: message.text,
  });
}
