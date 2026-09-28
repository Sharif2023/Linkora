import nodemailer from "nodemailer";

interface SendResetEmailParams {
  to: string;
  token: string;
}

export async function sendPasswordResetEmail({ to, token }: SendResetEmailParams) {
  const appUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const resetUrl = `${appUrl}/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(to)}`;

  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD;
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : smtpPort === 465;
  const emailFrom = process.env.EMAIL_FROM || (smtpUser ? `"Linkora Workspace" <${smtpUser}>` : '"Linkora" <no-reply@linkora.com>');

  const isConfigured = Boolean(smtpUser && smtpPass);

  if (!isConfigured) {
    console.log("\n=========================================================================");
    console.log(" [LINKORA EMAIL DISPATCH - LOCAL PREVIEW MODE]");
    console.log(` Recipient: ${to}`);
    console.log(` Reset Link: ${resetUrl}`);
    console.log(" Note: SMTP credentials are not yet set in .env.");
    console.log(" To receive real emails in Gmail, configure SMTP_USER & SMTP_PASS in .env");
    console.log("=========================================================================\n");

    return {
      sent: false,
      resetUrl,
      reason: "SMTP_NOT_CONFIGURED",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const info = await transporter.sendMail({
      from: emailFrom,
      to,
      subject: "Reset your Linkora Workspace Password",
      text: `Hello,\n\nYou requested a password reset for your Linkora Workspace account.\n\nClick the link below to set a new password:\n${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you did not request this, please ignore this email.`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Reset your Linkora Password</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #09090b; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="100%" max-width="500" style="max-width: 500px; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 36px 32px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
                    <tr>
                      <td align="center" style="padding-bottom: 24px;">
                        <span style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">Linkora</span>
                        <span style="display: inline-block; background-color: #27272a; color: #10b981; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px; margin-left: 6px; vertical-align: middle;">WORKSPACE</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 16px;">
                        <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; text-align: center;">Reset your password</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 28px; color: #a1a1aa; font-size: 14px; line-height: 1.6; text-align: center;">
                        We received a request to reset the password for your Linkora account associated with <strong style="color: #ffffff;">${to}</strong>.
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-bottom: 28px;">
                        <a href="${resetUrl}" style="display: inline-block; background-color: #10b981; color: #09090b; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 10px; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);">
                          Reset Password &rarr;
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 24px; color: #71717a; font-size: 12px; line-height: 1.5; text-align: center; border-top: 1px solid #27272a; padding-top: 20px;">
                        If the button above does not work, copy and paste this link into your browser:<br />
                        <a href="${resetUrl}" style="color: #34d399; word-break: break-all; text-decoration: underline;">${resetUrl}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="color: #52525b; font-size: 11px; text-align: center;">
                        This password reset link will expire in 1 hour.<br />
                        If you didn't request a password reset, you can safely ignore this email.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    console.log(`[LINKORA EMAIL] Sent password reset email to ${to}: ${info.messageId}`);
    return {
      sent: true,
      resetUrl,
    };
  } catch (error: any) {
    console.error("[LINKORA EMAIL ERROR] Failed to send email via SMTP:", error);
    // Return preview URL as fallback so user is never locked out
    return {
      sent: false,
      resetUrl,
      reason: error.message || "SMTP_DISPATCH_ERROR",
    };
  }
}
