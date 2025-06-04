
import { EmailData, sendEmail } from "@/lib/email";

export class EmailSender {
  static async send(emailData: EmailData) {
    try {
      const result = await sendEmail(emailData);
      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }
}
