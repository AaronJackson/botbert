
module.exports = function (matches, msg, rtm) {
    var today = new Date()
    var curHr = today.getHours()

    var resp = "";
    if (curHr < 12) {
	resp = "Good morning!";
    } else if (curHr < 18) {
	resp = "Good afternoon!";
    } else {
	resp = "Good evening!";
    }

    rtm.sendMessage(resp, msg.channel)
	.then((msg) => console.log(`Message sent`))
	.catch(console.error);

};
