module.exports = function (matches, msg, rtm) {
    var resp = "You shut up!";
    rtm.sendMessage(resp, msg.channel)
	.then((msg) => console.log(`Message sent`))
	.catch(console.error);

};
