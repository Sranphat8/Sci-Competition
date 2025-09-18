import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getVerificationEmailTemplate } from "./emailTemplate.js";

dotenv.config();
// create Gmail Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.STMP_USER,
        pass: process.env.STMP_PASSWORD,
    },
});

//Verify SMTP Connection Configuration
transporter.verify(function (error, success) {
    if (error) {
        console.error("SMTP Connection Error", error);
    } else {
        console.log("SMTP Server is ready to send mail");
    }
});

//send verification email
export const sendVerificationEmail = async(email, token, username) => {
    const verificationUrl = `${process.env.BASE_URL}/api/v1/auth/verify/${token}`;

    const mailOptions = {
        from:{
            name: "ระบบการแข่งขันวันวิทยาศาสตร์",
            email: process.env.EMAIL_FROM,
        },
        to: email,
        subject: "กรุณายืนยันอีเมลของคุณ",
        html: getVerificationEmailTemplate(verificationUrl, username),
        text: `ยินดีต้อนรับสู่ระบบการแข่งขันทางวิทยาศาสตร์!\n\nเรียน คุณ${username},
        \n\nขอบคุณที่ลงทะเบียนเข้าร่วมระบบการแข่งขันทางวิทยาศาสตร์
        กรุณายืนยันอีเมลของคุณโดยคลิกที่ลิงก์ด้านล่าง:\n\n${verificationUrl}\n\n
        หากคุณไม่ได้ลงทะเบียนในระบบนี้ กรุณาเพิกเฉยต่ออีเมลนี้
        ลิงก์ยืนยันอีเมลนี้จะหมดอายุภายใน 24 ชั่วโมง หากคุณไม่ได้เป็นผู้ลงทะเบียน 
        กรุณาละเว้นการคลิกลิงก์นี้ \n\nนี่เป็นข้อความอัตโนมัติ กรุณาอย่าตอบกลับอีเมลนี้ `,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully!");
        return info;
    } catch (error) {
        console.error("Error sending verification email", error);
    }

}