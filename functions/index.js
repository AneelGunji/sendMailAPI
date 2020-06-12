// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const cors = require("cors")({
    origin: true
});
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'naidulic1838@gmail.com',
        pass: 'naidu@123'
    }
});


exports.emailMessage = functions.https.onRequest((req, res) => {
    // const { name, email, phone, message } = req.body;
    cors(req, res, () => {
        let htmlMailBody = `<ul>
        <li>Name: ${req.body.name}
        <li>Mobile: ${req.body.mobile}`
        if (req.body.email) {
            html += `<li>Email: ${req.body.email}`
        }
        if (req.body.occupation) {
            html += `<li>Occupation: ${req.body.occupation}`
        }
        if (req.body.location) {
            html += `<li>Location: ${req.body.location}`
        }

        if (req.body.description) {
            html += `<li>Description: ${req.body.description}`
        }
        if (req.body.policyType) {
            html += `<li>Policy type: ${req.body.policyType}`
        }
        if (req.body.comment) {
            html += `<li>Comment: ${req.body.comment}`
        }
        html += `</ul>`;
        const mailOptions = {
            to: "naidulic1838@gmail.com",
            from: req.body.email,
            subject: `Agent registered`,
            html: htmlMailBody
        };
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }
            return res.send({
                status: 'success',
                message: 'Submitted successfully.'
            });
        });
    }).catch(() => {
        res.status(500).send("error");
    });
});