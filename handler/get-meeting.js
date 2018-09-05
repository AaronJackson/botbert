var fs = require('fs');

module.exports = function (matches, msg, rtm) {
    fs.readFile(".data/next-meeting", 'utf8', function(err, data) {
	if (err) {
	    rtm.sendMessage(`No meeting has been scheduled.`, msg.channel)
		.then((msg) => console.log(`Message sent`))
		.catch(console.error);
	    return;
	}

	var r = `The next meeting is on ${data}`;
	rtm.sendMessage(r, msg.channel)
	    .then((msg) => console.log(`Message sent`))
	    .catch(console.error);

    });
}
