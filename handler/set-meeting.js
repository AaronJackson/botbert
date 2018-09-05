var fs = require('fs');

module.exports = function (matches, msg, rtm) {
    var date = matches[1];
    var resp = `The next meeting will be on ${date}`

    fs.writeFile(".data/next-meeting", date, function(err) {
	console.log("The next meeting date has been saved.");
    }); 

    rtm.sendMessage(resp, msg.channel)
	.then((msg) => console.log(`Message sent`))
	.catch(console.error);

};
