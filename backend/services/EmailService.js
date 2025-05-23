// services/emailService.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendInvitationEmail = async ({ to, eventId, token }) => {
  const acceptLink = `${process.env.BASE_URL}/api/invitations/accept?token=${token}`;
  const declineLink = `${process.env.BASE_URL}/api/invitations/decline?token=${token}`;

  await transporter.sendMail({
    from: '"Schedulr" <noreply@schedulr.com>',
    to,
    subject: 'Undangan Event Baru',
    html: `
      <h1>Anda diundang untuk menghadiri event</h1>
      <p>Silakan klik salah satu opsi berikut:</p>
      <a href="${acceptLink}" style="background: green; color: white; padding: 10px 20px; margin-right: 10px; text-decoration: none;">Terima</a>
      <a href="${declineLink}" style="background: red; color: white; padding: 10px 20px; text-decoration: none;">Tolak</a>
    `
  });
};