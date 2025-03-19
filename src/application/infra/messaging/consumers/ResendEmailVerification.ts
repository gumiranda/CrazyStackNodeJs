import { parseJSON } from "@/application/helpers";
import { makeLoadUserFactory } from "@/slices/user/useCases";
import { makeEmailService } from "../factories/emailFactory";

export const resendEmailVerificationConsumer = {
  topic: "resendEmailVerification",
  callback: async (message: string) => {
    const parsedMessage = parseJSON(message);
    if (!parsedMessage) {
      return;
    }
    const { userCreated } = parsedMessage || {};
    const { email } = userCreated || {};
    const loadUser = makeLoadUserFactory();
    const user = await loadUser({
      fields: { email },
      options: { projection: { password: 1 } },
    });
    if (!user) {
      return;
    }
    const emailSender = makeEmailService();
    const emailVerificationLink = `http://localhost:3000/verify-email?email=${encodeURI(email)}&token=${user?.token}`;
    await emailSender.sendEmail(
      email,
      "Verifique o seu e-mail",
      ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Verifique seu e-mail</h2>
        <p>Olá ${user?.name ?? ""},</p>
        <p>Please verify your email address by clicking the button below:</p>
        <div>
        Código de verificação:
        ${user?.token}
        </div>
        <div style="margin: 30px 0;">
          <a href="${emailVerificationLink}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p>If you didn't create an account, you can safely ignore this email.</p>
        <p>This link will expire in 24 hours.</p>
      </div>`
    );
  },
};
