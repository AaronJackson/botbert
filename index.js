var config = require('./config');

const { RTMClient, WebClient } = require('@slack/client');

const rtm = new RTMClient(config.token);
rtm.start();

const syn = [
    {regex: /.*what.*status.*of\s(\w+).*$/i,
     handler: require('./handler/gpufree.js')}
];

rtm.on('message', (msg) => {
    for (s in syn) {
	var matches = syn[s].regex.exec(msg.text);
	if (matches != null)
	    syn[s].handler(matches, msg, rtm);
    }    
});
