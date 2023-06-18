const axios = require("axios");

const sendSms = ({ number, text }) => {
  const sendMessage = axios.post(
    `http://ws3584.isms.ir/sendWS?username=${process.env.SMS_PANEL_USER}&password=${process.env.SMS_PANEL_PASSWORD}&mobiles[]=${number}&body= ${text} `
  );
  return sendMessage;
};
module.exports = {
  sendSms,
};
