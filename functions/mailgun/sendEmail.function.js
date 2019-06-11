const functions = require("firebase-functions");
let config = require("../config/config");

const mailgun = require("mailgun.js").client({
  username: "api",
  key: config.mailgunApiKey
});

module.exports.sendEmail = functions.https.onCall((data, context) => {
  var message = {
    from: "BostonHacks<" + data.from + ">",
    to: data.to,
    subject: data.subject,
    text: data.text,
    "o:tracking": data.tracking,
    "o:tracking-clicks": data.clicktracking,
    "o:tracking-opens": data.opentracking
  };
  return mailgun.messages.create("bostonhacks.io", message);
});
