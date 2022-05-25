const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: "**API KEY", //Your API key
    server: "us8",
  });

module.exports=mailchimp;