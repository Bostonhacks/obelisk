const functions = require("firebase-functions");

const mailgun = require("mailgun.js").client({
  username: "api",
  key: "key-83ff3db5d8c4d6ab27b20da760e2a98e"
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
