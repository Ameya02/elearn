const {Resend} = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.MAIL_KEY);

module.exports = resend;