import type { EmailAdapter } from "../protocols/emailAdapter";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export class ResendAdapter implements EmailAdapter {
  async sendEmail(to: string, subject: string, html: string): Promise<any> {
    const { data, error } = await resend.emails.send({
      from: "Belezix <noreply@belezix.com",
      to: [to],
      subject,
      html,
    });
    if (error) {
      console.log({ error });
      return error;
    }
    console.log(data);
    return data;
  }
}
export const makeResendAdapter = () => {
  return new ResendAdapter();
};
