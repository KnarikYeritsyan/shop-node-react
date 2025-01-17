import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import _ from 'lodash';
const {EMAIL_LOGIN, EMAIL_PASSWORD} = process.env;

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_LOGIN,
        pass: EMAIL_PASSWORD,
    },
});

class Mail {

    static send = (email, subject, html) => {
        return transporter.sendMail({
            from: '"Yeritsyan" <knarik.yeritsyan@gmail.com>',
            to: email,
            subject,
            html,
        });
    }

    static sendActivation = (email, activationCode, activationUri) => {
        const html = fs.readFileSync(path.join(__dirname, 'emailTemplates/activation.ejs'), 'utf-8');
        return this.send(email, 'Activation message', _.template(html)({ email, activationCode, activationUri }))
    }

    static sendMessage = (email, text) => {
        const html = fs.readFileSync(path.join(__dirname, 'emailTemplates/email.ejs'), 'utf-8');
        return this.send(email, 'Shop message', _.template(html)({ text }))
    }

    static sendPassword = (email, activationCode, activationUri) => {
        const html = fs.readFileSync(path.join(__dirname, 'emailTemplates/forgotPassword.ejs'), 'utf-8');
        return this.send(email, 'Activation message', _.template(html)({ email, activationCode, activationUri }))
    }

}

export default Mail;