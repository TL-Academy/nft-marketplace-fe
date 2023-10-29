const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'nikolayradkov97.im@gmail.com', // The user sending the messages
        pass: '**** **** ****' // password received from google, giving access to third party apps
    },
    tls: {
        rejectUnauthorized: false, // As my test is unauthorized, setting this functionality to false,
        // I could test if it actually works.
    }
});

const mailOptions = {
    from: 'nikolayradkov97.im@gmail.com', // sender
    to: 'nikolayradkov36@gmail.com', // recipient
    subject: 'Hello, World!',
    text: 'This is my first actual message, sent with NodeMailer!',
};
// How the email is constructed

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error: ' + error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
// This construction is used to give a result depending on what happened. Whether if the action is successful
// or there is an error.


// Notes:
// In the feature there must be added db, from where we will isolate the people subscribed and send them emails. There will be component which will manage the state
// 'newFunctionalities = false/true' and then send messages.