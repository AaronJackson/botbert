var fs = require('fs');

module.exports = function (matches, msg, rtm) {
    h = matches[1].toLowerCase();

    var filename = "/cvlhome/public/.gpu-users." + h
    fs.readFile(filename, 'utf8', function(err, data) {
	if (err) {
	    rtm.sendMessage(`${h} does not exist.`, msg.channel)
		.then((msg) => console.log(`Message sent`))
		.catch(console.error);
	    return;
	}

	var lines = data.split("\n");

	var gpus_used = [];
	var num_gpus = 0;
	var users = 0;

	for (var l=0; l < lines.length; l++) {
	    var a = lines[l].match(/^([0-9]).*/);
	    if (a != null) gpus_used.push(parseInt(a[1]));

	    var b = lines[l].match(/^#NUM_GPU=([0-9])/);
	    if (b != null) num_gpus = parseInt(b[1]);

	    var c = lines[l].match(/^#NUM_USER=([0-9]+)/);
	    if (c != null) users = parseInt(c[1])
	}

	gpus_used = gpus_used.filter(function(elem, pos) {
	    return gpus_used.indexOf(elem) == pos;
	})

	gpus_used = gpus_used.length;

	var r = `${h} has ${gpus_used} busy GPUs of ${num_gpus}.` +
	    ` There are ${users} user(s) logged in. :gpu:`;
	rtm.sendMessage(r, msg.channel)
	    .then((msg) => console.log(`Message sent`))
	    .catch(console.error);

    });
}
