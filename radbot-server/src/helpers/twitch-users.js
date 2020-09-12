var axios = require('axios');
const dotenv = require('dotenv').config();

const getUserDetails = async (userId) => {
  let response = await axios.get(
    'https://api.twitch.tv/helix/users?id=' + userId,
    {
      headers: {
        'Client-ID': process.env.TWITCH_BOT_CLIENT,
        Authorization: 'Bearer ' + process.env.TWITCH_USER_OAUTH,
        Accept: 'application/vnd.twitchtv.v5+json',
      },
    },
  );
  if (response.status == 200) {
    if (response.data.data && response.data.data.length > 0){
      return response.data.data[0];
    } else {
      return null;
    }
  } else {
    console.log(error);
  }
};

const getUserDetailsByName = async (username) => {
  let response = await axios.get(
    'https://api.twitch.tv/helix/users?login=' + username,
    {
      headers: {
        'Client-ID': process.env.TWITCH_BOT_CLIENT,
        Authorization: 'Bearer ' + process.env.TWITCH_USER_OAUTH,
        Accept: 'application/vnd.twitchtv.v5+json',
      },
    },
  );
  if (response.status == 200) {
    return response.data.data;
  } else {
    console.log(error);
  }
};

const getChannelDetails = async (userId) => {
  let response = await axios.get(
    'https://api.twitch.tv/kraken/channels/457532056',
    {
      headers: {
        Authorization: 'OAuth ' + process.env.TWITCH_USER_OAUTH,
        Accept: 'application/vnd.twitchtv.v5+json',
      },
    },
  );
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  } else {
    console.log(error);
  }
};

const getNewFollowers = async (userId) => {
  let response = await axios.get(
    'https://api.twitch.tv/helix/users/follows?to_id=457532056',
    {
      headers: {
        'Client-ID': process.env.TWITCH_BOT_CLIENT,
        Authorization: 'Bearer ' + process.env.TWITCH_USER_OAUTH,
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
  getUserDetails, getChannelDetails, getNewFollowers, getUserDetailsByName
};
