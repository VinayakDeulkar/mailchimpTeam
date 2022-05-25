const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: "9ff5123f4eeea918b8969f1facd57d49-us8",
    server: "us8",
  });

module.exports=mailchimp;