const brevo = require('@getbrevo/brevo');
const apiInstance = new brevo.TransactionalEmailsApi();
require("dotenv").config();
const { BREVO_KEY } = process.env;

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  BREVO_KEY
);

const sendRegistrationEmail = async (email, firstname) => {
  console.log(email, firstname)
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail()

    sendSmtpEmail.subject = "Bienvenido a LunchUP!";
    sendSmtpEmail.to = [
      { email: email , name: firstname }
    ];
    sendSmtpEmail.htmlContent = "<html><body><h1>Bienvenido a nuestra aplicación</h1><p>Gracias por registrarse</p>";
    sendSmtpEmail.sender = {
      name: "LunchUP",
      email: "lunchup.pf@gmail.com"
    }
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email enviado exitosamente");
  } catch (error) {
    throw new Error("Error al enviar el email:", error.message);
  }
};

module.exports = sendRegistrationEmail;
