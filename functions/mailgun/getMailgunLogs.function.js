const functions = require("firebase-functions");
let config = require("../config/config");

const mailgun = require("mailgun-js")({
  apiKey: config.mailgunApiKey,
  domain: "bostonhacks.io"
});

module.exports.getMailgunLogs = functions.https.onCall((data, context) => {
  return mailgun.get("/bostonhacks.io/events", {
    from: "contact@bostonhacks.io",
    to: "NOT contact@bostonhacks.io",
    event:
      "delivered OR failed OR opened OR clicked OR unsubscribed OR complained"
  });
});
