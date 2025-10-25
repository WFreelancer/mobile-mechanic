import nodemailer from 'nodemailer';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { name, email, phone, address } = req.body;

		// Настроим транспорт для отправки почты
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST, // Сервер SMTP
			port: process.env.SMTP_PORT, // Порт
			secure: false, // true для порта 465, false для других портов
			auth: {
				user: process.env.SMTP_USER, // Email-логин
				pass: process.env.SMTP_PASSWORD, // Пароль для приложения
			},
		});

		try {
			const mailOptions = {
				from: process.env.SMTP_USER,
				to: 'oleg18051978@gmail.com',
				subject: 'New Contact Request',
				text: `
					Name: ${name}
					Email: ${email}
					Phone: ${phone}
					Address: ${address || 'Not provided'}
				`,
			};

			// Отправляем письмо
			await transporter.sendMail(mailOptions);
			res.status(200).json({ success: true });
		} catch (error) {
			console.error('Error sending email:', error);
			res.status(500).json({ success: false, error: error.message });
		}
	} else {
		res.status(405).json({ message: 'Method Not Allowed' });
	}
}
