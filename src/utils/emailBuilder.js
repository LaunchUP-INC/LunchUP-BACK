const brevo = require("@getbrevo/brevo");

const defaultClient = brevo.ApiClient.instance;
const apiKey = defaultClient.authentications["apiKey"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new brevo.TransactionalEmailsApi();

async function sendEmail({ subject, email, name, htmlContent }) {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail({
      subject: subject,
      to: [
        {
          email: email,
          name: name,
        },
      ],
      htmlContent: `<h1>${htmlContent}</h1>`,
      sender: { name: "LunchUP", email: "noreply@lunchup.com" },
    });

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendEmail };
