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

	var users = {}

	for (var l=0; l < lines.length; l++) {

	    var a = lines[l].match(/^([0-9]) (\w).*/);         	    
	    if (a != null){ 
             if (typeof users[a[2]]==='undefined'){
                  users[a[2]]=0;
             }
             users[a[2]]++;
            }

	}
	
	var r = ''

       for (var user in users){

	r+=`${user} is using ${users[user]}\n`

      }

	rtm.sendMessage(r, msg.channel)
	    .then((msg) => console.log(`Message sent`))
	    .catch(console.error);

    });
}
