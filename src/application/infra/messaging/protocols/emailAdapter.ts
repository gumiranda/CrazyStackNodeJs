export interface EmailAdapter {
  sendEmail(to: string, subject: string, html: string): Promise<any>;
}
