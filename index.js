var config = require('./config');

const { RTMClient, WebClient } = require('@slack/client');

const rtm = new RTMClient(config.token);
rtm.start();

const syn = [
    {regex: /.*what.*status.*of\s(\w+).*$/i,
     handler: require('./handler/gpufree.js')},

    {regex: /^hello.*|good morning.*|^hey.*/gi,
     handler: require('./handler/greeting.js')},

    {regex: /.*the next meeting.*on (.*\w)/gi,
     handler: require('./handler/meeting.js').set},
    {regex: /.*when is the.*meeting/gi,
     handler: require('./handler/meeting.js').get},

    {regex: /.*who.*using\s(\w+).*$/i,
     handler: require('./handler/gpuuser.js')},

    {regex: /^who is ([a-z0-9]*)/gi,
     handler: require('./handler/whois.js')},

    {regex: /shut up/gi,
     handler: require('./handler/shutup.js')},

     regex: /tell me a joke/gi,
      handler: require('./handler/joke.js')},

    {regex: /i'm ([a-z]*)/gi,
     handler: require('./handler/im.js')},

];

rtm.on('message', (msg) => {
    for (var s in syn) {
	var matches = syn[s].regex.exec(msg.text);
	syn[s].regex.lastIndex = 0; // reset the expression
	if (matches !== null) {
	    syn[s].handler(matches, msg, rtm);
	    break;
	}
    }
});
