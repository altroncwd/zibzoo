var nodemailer = require('nodemailer');

/* ************************************************************
Emailer
**************************************************************/

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: 'Gmail',          // we might need to change moduels for other other email types (SendGrit, Mailgun, mailchimp, ???)
  auth: {
    user: '______________',  // email count
    pass: '______________'   // account password
  }
});

// setup e-mail data
var mailOptions = function (recipientEmail) {
  var mail = {
    from: 'ZibZoo <christopher.w.decker@gmail.com>',  // sender address
    to: recipientEmail,  // list of receivers
    subject: 'ZibZoo : Your order is ready ✔', // Subject line
    text: 'Get it fast, get it quick. ZibZoo!!', // plaintext body
  };
  return mail;
};

exports.sendMail = function (usersEmail) {
  transporter.sendMail(mailOptions(usersEmail), function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response + '\n');
  });
};
