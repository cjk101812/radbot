var axios = require('axios');
const dotenv = require('dotenv').config();

const changeLightColor = async (color) => {
  let response = await axios.put(
    'https://api.lifx.com/v1/lights/all/state',
    {
      "color": color,
      "brightness": 0.5,
      "duration": 5,
    },
    {
      headers: {
        Authorization: 'Bearer ' + process.env.LIFX_API_KEY
      },
    }
  );
};

const lightParty = async () => {
  let response = await axios.post(
    'https://api.lifx.com/v1/lights/all/effects/pulse',
    {
      "period": 1,
      "cycles": 10,
      "color": 'white'
    },
    {
      headers: {
        Authorization: 'Bearer ' + process.env.LIFX_API_KEY
      },
    }
  );
};

const pickRandomHex = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

module.exports = {
  changeLightColor, lightParty, pickRandomHex
};