var nodemailer = require('nodemailer');
/* ************************************************************
Emailer
**************************************************************/

var mailDetails = {
  email: process.env.EMAIL,
  password: process.env.EMAILPASSWORD
};

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: 'Gmail',          // we might need to change moduels for other other email types (SendGrit, Mailgun, mailchimp, ???)
  auth: {
    user: mailDetails.email,  // email count
    pass: mailDetails.password   // account password
  }
});

// setup e-mail data
var mailOptions = function (finishedOrderObj) {
  console.log('EMAIL DETAILS', mailDetails.email);

  var orderNumber = finishedOrderObj.orderNumber + 1;
  var displayMessage = '<div style="text-align:center; border: 5px solid #ff6600; border-radius: 10px; width:300px; font-family: Trebuchet MS, helvetica ">  <h1> ZibZoo </h1>  <p style="line-height: 0%">Your order is ready</p>  <h3 style="line-height: 0%"> Order # </h3>  <h1>' + orderNumber + '</h1>  <p style="line-height: 0%">or let them know your email</p>  <br>  <p style="line-height: 0%"> Get it fast, get it quick</p>  <p style="font-size:15px; line-height: 0%"> Thanks for choosing ZibZoo!</p></div>';

  var mail = {
    from: 'ZibZoo <' + mailDetails.email + '>',  // sender address
    to: finishedOrderObj.customerEmail,  // list of receivers
    subject: 'ZibZoo : Your order is ready ✔', // Subject line
    html: displayMessage
  };
  return mail;
};

exports.sendMail = function (OrderObject) {
  transporter.sendMail(mailOptions(OrderObject), function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response + '\n');
  });
};
