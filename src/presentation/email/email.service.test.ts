import nodemailer from "nodemailer";

import { EmailService, SendMailOptions } from "./email.service";

describe("EmailService", () => {
  const mockSendMail = jest.fn();

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  const emailService = new EmailService();

  test("should send email", async () => {
    const options: SendMailOptions = {
      to: "correo@correo.com",
      subject: "Subject",
      htmlBody: "<h1>Body</h1>",
    };

    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "<h1>Body</h1>",
      subject: "Subject",
      to: "correo@correo.com",
    });
  });

  test("should send email with attachments", async () => {
    const email = "correo@correo.com";

    await emailService.sendEmailWithFileSystemLogs(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: "Server Logs",
      html: expect.any(String),
      attachments: [
        { filename: "logs-all.log", path: "logs/logs-all.log" },
        { filename: "logs-high.log", path: "logs/logs-high.log" },
        { filename: "logs-medium.log", path: "logs/logs-medium.log" },
      ],
    });
  });
});
