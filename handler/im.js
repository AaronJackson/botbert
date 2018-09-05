module.exports = function (matches, msg, rtm) {
    var verb = matches[1].toLowerCase();
    var resp = `Hi ${verb}, I'm botbert! hahaha`;

    rtm.sendMessage(resp, msg.channel)
	.then((msg) => console.log(`Message sent`))
	.catch(console.error);

};
