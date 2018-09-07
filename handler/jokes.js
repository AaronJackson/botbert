module.exports = function (matches, msg, rtm) {
  
  const fs = require('fs');

  let rawdata = fs.readFileSync('.data/jokes.json');
  let jokes = JSON.parse(rawdata);

  jokes=jokes.filter(function(elem,i){
    return elem.body!=='' && elem.body.length< 300 ;
  });
  randomnumber=Math.round(Math.random() * jokes.length);
  joke=jokes[randomnumber]['body'];
  rtm.sendMessage(joke, msg.channel)
  .then((msg) => console.log(`Message sent`))
  .catch(console.error);

};
