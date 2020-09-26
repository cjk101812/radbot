// https://api.memegen.link/docs/#/

var axios = require('axios');
const dotenv = require('dotenv').config();

const getMeme = async (meme) => {
  let response = await axios.get(
    'https://api.memegen.link/images/' + meme + '/_.png',
    {
      headers: {
        'X-API-KEY': 'test'
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

// !MEME HELP GITHUB DOCS
// !giphy support

// CREATE MEME (COSTS CHANNEL POINTS)
// MEME IS SHOWN ON OVERLAY, AND THE BOT RESPOND ID
// CHAT CAN !MEMEAPPROVE + ID to "UPVOTE"
// MOST UPVOTES GO TO MEME HOF

// !MEMES MINE - SHOWS LAST FEW MEMES YOU CREATED
// !MEMES HOF - SHOWS CURRENT MEME HOF