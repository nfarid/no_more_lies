
import nodemailer from "nodemailer";

export const testAccount = await nodemailer.createTestAccount();
export const emailTransporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass
    }
});
