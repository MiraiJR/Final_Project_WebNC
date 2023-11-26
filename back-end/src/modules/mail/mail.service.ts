import { BadRequestException, Injectable } from '@nestjs/common';
import * as Nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  Transporter = Nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  async sendMailVerifyEmail(email: string, token: string) {
    const title = 'VERIFY EMAIL';
    this.Transporter.sendMail(
      {
        from: 'MangaHay<no-reply>',
        to: `${email}`,
        subject: `${title.toUpperCase()}`,
        html: ` <h1>Hello,</h1>
        <div>Xác nhận email: </div>
          <a href='${process.env.HOST_BE}/api/v1/auth/verify-email?token=${token}' style='font-size: 30px; margin-left: 10px; color: red; text-align: center; padding: 10px;'>Nhấn vào link này để xác nhận</a>
        <div>Link xác nhận chỉ tồn tại trong vòng 5 phút</div>
        <div>
          <div style='text-align: center;'>Chúng tôi cảm ơn bạn đã sử dụng website.</div>
        </div>`,
      },
      function (error: any) {
        if (error) {
          throw new Error(`${email} khÔng hợp lệ vui lòng thử lại`);
        }
      },
    );
  }

  async sendMailForgetPassword(email: string, content: string) {
    const title = 'FORGOT PASSWORD';

    this.Transporter.sendMail(
      {
        from: 'MangaHay<no-reply>',
        to: `${email}`,
        subject: `${title.toUpperCase()}`,
        html: `
        <div>Hello bạn,</div>
        <div>Đổi mật khẩu theo link: </div>
          <a href='${process.env.URL_CHANGEPASSWORD}?token=${content}' style='font-size: 30px; margin-left: 10px; color: red; text-align: center; padding: 10px;'>Nhấn vào link này để xác nhận đổi mật khẩu</a>
        <div>Link này chỉ tồn tại trong vòng 5 phút. Vui lòng click vào để thực hiện đổi mật khẩu.</div>
        <div>
          <div style='text-align: center;'>MangaHay cảm ơn bạn đã sử dụng website.</div>
        </div>`,
      },
      function (error: any) {
        if (error) {
          throw new BadRequestException(
            `${email} khÔng hợp lệ vui lòng thử lại`,
          );
        }
      },
    );
  }
}
