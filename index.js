const express = require("express");
const app = express();
const cors = require("cors");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const { OAuth2 } = google.auth;
const contactRouter = require("./routes/contact.routes.js");
require("dotenv").config();
app.use(cors());
// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", contactRouter);
// Validaciones y sanitizaciones para el endpoint /contact
app.get("/", (req, res) => {
    res.status(200).json({ message: "Contact service online" });
});

const createTransporter = async () => {
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
    });

    let accessToken = "";

    try {
        accessToken = oauth2Client.getAccessToken();
    } catch (error) {
        throw error;
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
        },
    });

    return transporter;
};
//emailOptions - who sends what to whom
const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};
sendEmail({
    subject: "Test",
    text: "I am sending an email from nodemailer!",
    to: "put_email_of_the_recipient",
    from: process.env.EMAIL,
});
// Iniciar el servidor en el puerto 3000
app.listen(process.env.PORT || 3000, () => {
    console.log(`App running at ${process.env.PORT}`);
});
