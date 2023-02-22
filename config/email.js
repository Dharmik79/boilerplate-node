const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API);

const createEmail = async (to, text,subject) => {
  try {
    const msg = {
      to: to, 
      from: "", 
      subject: subject,
      text: text,
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createEmail,
};
