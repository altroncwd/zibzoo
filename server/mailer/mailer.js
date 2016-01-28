var nodemailer = require('nodemailer');

/*************************************************************
Emailer
**************************************************************/

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'christopher.w.decker@gmail.com',
    pass: 'ArcCerberus830'
  }
});

// setup e-mail data
var mailOptions = {
  from: 'ZibZoo <christopher.w.decker@gmail.com>',  // sender address
  to: 'christopher.w.decker@gmail.com',  // list of receivers
  subject: 'ZibZoo : Your order is ready ✔', // Subject line
  text: 'Get it fast, get it quick. ZibZoo!!', // plaintext body
  // attachments: [
  // {   // filename and content type is derived from path
  // //this path is for EC2
  // path: '/home/ec2-user/cron-job/app/debug.log'
  // }]
};

exports.sendMail = function () {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response + '\n');
  });
};
