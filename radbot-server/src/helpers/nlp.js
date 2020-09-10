const natural = require('natural');
const Analyzer = natural.SentimentAnalyzer;
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;
const { changeLightColor } = require('./lifx-controls');

const analyzer = new Analyzer("English", stemmer, "afinn");

let sentimentArray = [];
let isSentimentActivated = false;
let currentlightColor;

setInterval(() => {
  const timeToPrune = new Date(); 
  timeToPrune.setMinutes(timeToPrune.getMinutes() - 10);
  sentimentArray = pruneSentiment(timeToPrune);
  // calculate new average 
  let totalChats = 0;
  let totalChatScore = 0;
  sentimentArray.forEach(chat => {
    if(!isNaN(chat.score)) {
      totalChatScore += chat.score;
      totalChats++;
    }
  });
  const averageChatScore =  totalChatScore / totalChats;
  if (isSentimentActivated) {
    if (averageChatScore <= 0) {
      if (currentlightColor !== 'red' ) {
        changeLightColor('red');
        currentlightColor = 'red';
      }
    } else if (averageChatScore > 0 && averageChatScore < 1 ) {
      if (currentlightColor !== 'blue' ) {
        changeLightColor('blue');
        currentlightColor = 'blue';
      }
    } else {
      if (currentlightColor !== 'green' ) {
        changeLightColor('green');
        currentlightColor = 'green';
      }
    }
  }
}, 15000);

const analyzeString = (chatter) => {
  const tokenizedChat = tokenizer.tokenize(chatter.message);
  const score = analyzer.getSentiment(tokenizedChat);
  sentimentArray.push({ time: chatter.tmi_sent_ts, score });
  if (score > .5) {
    return 'green';
  } else {
    return 'red';
  }
}

const pruneSentiment = (pruneTime) => {
  const filteredArray = sentimentArray.filter(message => {
    return message.time > pruneTime;
  });
  return filteredArray;
}

const toggleLightMode = (mode) => {
  isSentimentActivated = mode;
}

module.exports = {
  analyzeString, toggleLightMode
};