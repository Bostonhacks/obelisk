const functions = require("firebase-functions");
let config = require("../config/config");

const mailgun = require("mailgun.js").client({
  username: "api",
  key: config.mailgunApiKey
});

module.exports.sendEmail = functions.https.onCall((data, context) => {
  let tracking;
  let clicktracking;
  let opentracking;
  if (data.tracking === true) {
    tracking = "true";
  } else {
    tracking = "false";
  }
  if (data.clicktracking === true) {
    clicktracking = "true";
  } else {
    clicktracking = "false";
  }
  if (data.opentracking === true) {
    opentracking = "true";
  } else {
    opentracking = "false";
  }
  var message = {
    from: "BostonHacks<" + data.from + ">",
    to: data.to,
    subject: data.subject,
    text: data.text,
    "o:tracking": tracking,
    "o:tracking-clicks": clicktracking,
    "o:tracking-opens": opentracking
  };
  return mailgun.messages.create("bostonhacks.io", message);
});
