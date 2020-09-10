const WebSocket = require('ws');
const axios = require('axios');

const setupPubSub = async () => {

  // https://id.twitch.tv/oauth2/authorize?client_id=&redirect_uri=http://locahost:4200&response_type=token%20&scope=channel:read:redemptions%20channel_subscriptions
  const TwitchPubSubSocket = new WebSocket("wss://pubsub-edge.twitch.tv");

  TwitchPubSubSocket.onopen = function (event) {
    TwitchPubSubSocket.send(JSON.stringify({
      "type": "PING"
    }));
    TwitchPubSubSocket.send(JSON.stringify({
      "type": "LISTEN",
      "nonce": "thatsradredeemnonce",
      "data": {
        "topics": ["channel-points-channel-v1.457532056"],
        "auth_token": process.env.TWITCH_SUB_CLIENT
      }
    }));
    TwitchPubSubSocket.send(JSON.stringify({
      "type": "LISTEN",
      "nonce": "thatsradsubnonce",
      "data": {
        "topics": ["channel-subscribe-events-v1.457532056"],
        "auth_token": process.env.TWITCH_SUB_CLIENT
      }
    }));
  };

  TwitchPubSubSocket.onmessage = (event) => {
    console.log(event.data);
  }
}

module.exports = {
  setupPubSub,
};