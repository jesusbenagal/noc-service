import nodemailer from "nodemailer";

import { envs } from "../../config/plugins/envs.plugin";

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.SERVICE_MAILER,
    auth: {
      user: envs.SENDER_MAILER,
      pass: envs.SECRET_KEY_MAILER,
    },
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      return true;
    } catch (error) {
      console.error("Error sending email: ", error);
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Server Logs";

    const htmlBody = `
      <h1>Server Logs</h1>
      <p>Find attached the logs from the server.</p>
      `;

    const attachments: Attachment[] = [
      { filename: "logs-all.log", path: "logs/logs-all.log" },
      { filename: "logs-high.log", path: "logs/logs-high.log" },
      { filename: "logs-medium.log", path: "logs/logs-medium.log" },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
