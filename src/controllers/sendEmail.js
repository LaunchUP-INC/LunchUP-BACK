require("dotenv").config();
const { BREVO_API_KEY } = process.env;
const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

const apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = `${BREVO_API_KEY}`;

const sendEmail = async (email, name, htmlContent) => {
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.subject = "Bienvenido a LunchUP";
  sendSmtpEmail.htmlContent = `<h1>${htmlContent}</h1>`;
  sendSmtpEmail.sender = {
    name: "LunchUP",
    email: "lunchup.pf@gmail.com",
  };
  sendSmtpEmail.to = [{ email: email, name: name }];
  sendSmtpEmail.replyTo = {
    email: "lunchup.pf@gmail.com",
    name: "LunchUP",
  };
  sendSmtpEmail.params = {
    name: name,
  };
  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    throw new Error(console.log(error));
  }
};

module.exports = { sendEmail };
