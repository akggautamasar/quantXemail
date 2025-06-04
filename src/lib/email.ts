
const RESEND_API_KEY = "re_FP4rP9T5_Kb4CC9NEihP8GK6JushBooPL";

export interface EmailData {
  to: string;
  subject: string;
  message: string;
}

export const sendEmail = async (emailData: EmailData) => {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'QuantXemail <onboarding@resend.dev>',
        to: [emailData.to],
        subject: emailData.subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
              <h1 style="color: white; margin: 0; text-align: center; font-size: 24px;">QuantXemail</h1>
            </div>
            <div style="background: #f8fafc; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0;">
              <div style="white-space: pre-wrap; line-height: 1.6; color: #334155; font-size: 16px;">
                ${emailData.message}
              </div>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 14px;">
              Sent with QuantXemail
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
