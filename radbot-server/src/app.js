const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const dotenv = require('dotenv').config();
const TwitchBot = require('twitch-bot');
const { getUserDetails, getUserDetailsByName } = require('./helpers/twitch-users');
const { changeLightColor, lightParty, pickRandomHex } = require('./helpers/lifx-controls');
const { setupPubSub } = require('./helpers/pub-sub');
const { analyzeString, toggleLightMode } = require('./helpers/nlp');

const usersInChat = [];
let moodRingEnabled = false;

// Twitch Bot Listener Setup
const Bot = new TwitchBot({
  username: 'thatsradbot',
  oauth: 'oauth:' + process.env.TWITCH_BOT_OAUTH,
  channels: ['thatsradcullen'],
});

// setupPubSub();

Bot.on('connected', (connection) => {
  console.log('Twitch Bot Connection successful.');
});
Bot.on('message', async (chatter) => {

  if (moodRingEnabled === true) {
    const sentimentColor = analyzeString(chatter);
    changeLightColor(sentimentColor);
  }

  const user = await getUserDetails(chatter.user_id);
  chatter = {
    ...chatter,
    logo: user.profile_image_url,
  };
  io.emit('radbot_chat', chatter);

  const splitMessage = chatter.message.split(' ');

  if (splitMessage[0] === '!lightmode' && chatter.display_name === 'ThatsRadCullen') {
    if (splitMessage[1] === 'sentiment') {
      moodRingEnabled = true;
      toggleLightMode(true);
    } else if (splitMessage[1] === 'custom') {
      moodRingEnabled = false;
      toggleLightMode(false);
    } else if (splitMessage[1] === 'status') {
      Bot.say(`Lights are currently on ${moodRingEnabled === true ? 'sentiment' : 'custom' } mode.`);
    }
  }
  if (moodRingEnabled) {
    if (splitMessage[0] === '!light') {
      Bot.say("Lights are currently on sentiment mode.");
    }
  }
  if (!moodRingEnabled) {
    if (splitMessage[0] === '!light') {
      if (splitMessage[1] === 'party') {
        lightParty();
      } else if (splitMessage[1] === 'random') {
        const newColor = pickRandomHex();
        io.emit('color_change', newColor);
        changeLightColor(newColor);
        Bot.say("Beep boop beep. Changing the lights.");
      } else if (splitMessage[1]) {
        io.emit('color_change', splitMessage[1]);
        changeLightColor(splitMessage[1]);
        Bot.say("Beep boop beep. Changing the lights.");
      } else {
        Bot.say("Pass in a valid hex color or I ain't doin' anything.");
      }
    }
  }

  
  // if (chatter.message === '!battle') {
  //   io.emit('radbot_battle', chatter);
  // }


  if (chatter.message === '!playercard') {
    io.emit('radbot_playercard', chatter);
    Bot.say(
      "Your player card is built using stats you've built up on the channel! Check it out in the stream window for the next 10 seconds!! Quick!",
    );
  }


  if (splitMessage[0] === '!qnaask') {
    const question = splitMessage.splice(1, splitMessage.length).join(' ');
    io.emit('new_qna', { user: chatter, question });
  }
  if (splitMessage[0] === '!qna' && chatter.display_name === 'ThatsRadCullen') {
    if (splitMessage[1] === 'start') {
      Bot.say("Working on the start functionality.");
    } else if (splitMessage[1] === 'activate') {
      // !qna activate 1
      const idToRemove = splitMessage[2];
      io.emit('activate_qna', idToRemove);
    } else if (splitMessage[1] === 'remove') {
      // !qna remove 1
      const idToRemove = splitMessage[2];
      io.emit('remove_qna', idToRemove);
    }
  }


  if (
    chatter.message.toLowerCase().includes('cant') ||
    chatter.message.toLowerCase().includes("can't")
  ) {
    Bot.say('Not with that attitude.');
  }


  if (splitMessage[0] === '!so' && chatter.display_name === 'ThatsRadCullen') {
    const username = splitMessage[1];
    const userDetails = await getUserDetailsByName(username);
    if (userDetails.length > 0){
      const cardDetails = {
        ...userDetails[0],
        logo: userDetails[0].profile_image_url,
      };
      Bot.say(`Go check out ${cardDetails.display_name}'s stream!`);
      io.emit('radbot_playercard', cardDetails);
    } else {
      Bot.say(`Try typing their name in right, boss.`);
    }
  }
});

Bot.on('part', (user) => {
  usersInChat = usersInChat.filter((x) => {
    return x.id !== user.id;
  });
  io.emit('radbot_users', usersInChat);
});

io.on('connection', (socket) => {
  console.log('Client Connected');
  socket.on('radbot_shoutout', (user) => {
    Bot.say(
      `Big shoutout to @${user} for being super rad!!! Go check out their channel!`,
    );
  });

  socket.on('radbot_announcement', (announcement) => {
    if (announcement !== null) {
      Bot.say(announcement);
    }
  });

  socket.on('radbot_battle_winner', (player) => {
    if (player !== null) {
      io.emit('radbot_playercard', player);
      lightParty();
      const message = `Congrats ${player.display_name}! You won the battle!`;
      Bot.say(message);
    }
  });

  socket.on('radbot_battle_queued', (player) => {
    if (player !== null) {
      Bot.say(
        `Alright ${player.display_name}, you've been entered into the next battle!`,
      );
    }
  });

  socket.on('radbot_battle_progress', (player) => {
    if (player !== null) {
      const message = `Yoooo ${player.display_name}! Wait till the current battle is over then try again!`;
      Bot.say(message);
    }
  });

  socket.on('disconnect', () => {
    console.log('CLIENT DISCONNECTED');
  });
});

http.listen(3002);
