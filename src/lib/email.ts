import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT ?? 587);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const defaultFrom = process.env.SMTP_FROM ?? smtpUser;

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !defaultFrom) {
    // Email not configured; return null so callers can safely no-op.
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  return transporter;
}

export async function sendEmail(options: {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
}) {
  const tx = getTransporter();
  if (!tx) {
    // Silently skip if email is not configured
    return;
  }

  await tx.sendMail({
    from: defaultFrom,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}
