import dotenv from "dotenv";
dotenv.config();

export const generateWelcomeEmail = (name, email) => ({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: `🎉 Welcome to FullStack-Todo-App, ${name}!`,
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #4CAF50;">🎉 Welcome to FullStack-Todo-App, ${name}!</h2>
        <p>Hi ${name},</p>
        <p>We're excited to have you on board! You've successfully registered to <strong>FullStack-Todo-App</strong>.</p>
        <p>This app allows you to manage your tasks effortlessly with features like:</p>
        <ul>
        <li>Create, edit, and delete your todos</li>
        <li>Track completed tasks</li>
        <li>Secure login and password recovery</li>
        </ul>
        <p>Start using the app now and take control of your productivity.</p>
        <p style="margin-top: 20px;">Cheers,<br/>The FullStack-Todo-App Team</p>
        <hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;" />
        <small>If you didn’t sign up for this account, you can safely ignore this email.</small>
        </div>
    `
});

export const generateResetOtpEmail = (email, otp) => ({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: `🔒 Reset Password for FullStack-Todo-App`,
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #4CAF50;">🔒 Reset Password for FullStack-Todo-App</h2>
        <p>Hi ${email},</p>
        <p>We received a request to reset your password for your FullStack-Todo-App account. To proceed with the password reset, please use the following verification code:</p>
        <p style="font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0;">${otp}</p>
        <p>This code will expire in 10 minutes.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Thank you for using FullStack-Todo-App!</p>
        <hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;" />
        <small>If you didn’t sign up for this account, you can safely ignore this email.</small>
        </div>
    `
})

export const generateVerificationEmail = (email, otp) => ({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: `🔒 Verify your email for FullStack-Todo-App`,
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #4CAF50;">🔒 Verify your email for FullStack-Todo-App</h2>
        <p>Hi ${email},</p>
        <p>We received a request to verify your email for your FullStack-Todo-App account. To proceed with the email verification, please use the following verification code:</p>
        <p style="font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0;">${otp}</p>
        <p>This code will expire in 10 minutes.</p>
        <p>If you did not request an email verification, please ignore this email.</p>
        <p>Thank you for using FullStack-Todo-App!</p>
        <hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;" />
        <small>If you didn’t sign up for this account, you can safely ignore this email.</small>
        </div>
    `
})