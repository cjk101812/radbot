var axios = require('axios');
const dotenv = require('dotenv').config();

const getUserDetails = async (userId) => {
  let response = await axios.get(
    'https://api.twitch.tv/kraken/users/' + userId,
    {
      headers: {
        Authorization: 'OAuth ' + process.env.TWITCH_BOT_OAUTH,
        Accept: 'application/vnd.twitchtv.v5+json',
      },
    },
  );
  if (response.status == 200) {
    return response.data;
  } else {
    console.log(error);
  }
};

module.exports = {
  getUserDetails,
};
