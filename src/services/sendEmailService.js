import nodemailer from "nodemailer";

export async function sendEmailService({
	to,
	subject,
	message, 
	attachments = [],
} = {}) {
	// configurations
	const transporter = nodemailer.createTransport({
		host:'localhost',
                port:465,
                secure:true,
                service:'gmail',
		auth: {
			// credentials
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASSWORD,
		},tls:{rejectUnauthorized:false}
	});

	const emailInfo = await transporter.sendMail({
		from: '"faculty of computers and informatics" <${process.env.EMAIL}>',
		to: to ? to : "",
		subject: subject ? subject : "Hello",
		html: message ? message : 'graduateszagazig@gmail.com',
		attachments,
	});
	if (emailInfo.accepted.length) {
		return true;
	}
	return false;
}
