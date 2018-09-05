var fs = require('fs');
module.exports = {};

module.exports.get = function (matches, msg, rtm) {
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

module.exports.set = function (matches, msg, rtm) {
    var date = matches[1];
    var resp = `The next meeting will be on ${date}`

    fs.writeFile(".data/next-meeting", date, function(err) {
	console.log("The next meeting date has been saved.");
    }); 

    rtm.sendMessage(resp, msg.channel)
	.then((msg) => console.log(`Message sent`))
	.catch(console.error);

};
