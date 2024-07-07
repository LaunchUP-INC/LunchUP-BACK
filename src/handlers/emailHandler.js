const { sendEmail } = require("../controllers/sendEmail");

const sendWelcomeEmail = async (req, res) => {
  const { email, firstname } = req.body;

  try {
    const response = await sendEmail(email, firstname, "This is my first email");
    res.status(200).json( console.log("Welcome email sent successfully!")  );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { sendWelcomeEmail };
