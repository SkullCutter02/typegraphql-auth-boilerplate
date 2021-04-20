import { Service } from "typedi";
import { getTestMessageUrl, SendMailOptions } from "nodemailer";

import getTransporter from "../../utils/getTransporter";

@Service()
export default class MailService {
  async send(email: string, url: string) {
    const mailOptions: SendMailOptions = {
      from: "foo@example.com",
      to: email,
      subject: "Reset password",
      text: url,
      html: `<a href="${url}">${url}</a>`,
    };

    const transporter = await getTransporter();

    const info = await transporter.sendMail(mailOptions);

    console.log(getTestMessageUrl(info));

    return info;
  }
}
