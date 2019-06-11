const functions = require("firebase-functions");

const mailgun = require("mailgun-js")({
  apiKey: "key-83ff3db5d8c4d6ab27b20da760e2a98e",
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
