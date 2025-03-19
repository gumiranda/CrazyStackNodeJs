import { makeResendAdapter } from "../adapters/resendAdapter";
import type { EmailAdapter } from "../protocols/emailAdapter";

export class EmailService {
  private adapter: EmailAdapter;
  constructor(adapter: EmailAdapter) {
    this.adapter = adapter;
  }
  async sendEmail(to: string, subject: string, html: string): Promise<any> {
    await this.adapter.sendEmail(to, subject, html);
  }
}
type EmailProviderKeys = "resend";

const emailProviders: Record<EmailProviderKeys, () => EmailAdapter> = {
  resend: makeResendAdapter,
};

export const makeEmailService = () => {
  const provider = (process.env.EMAIL_PROVIDER || "resend") as EmailProviderKeys;
  return new EmailService(emailProviders[provider]());
};
