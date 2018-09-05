var ldap = require('ldapjs');
var config = require('../config');

module.exports = function (matches, msg, rtm) {
    var ldapClient = ldap.createClient(config.ldapServer);
    var uid = matches[1].toLowerCase();

    var search = {
	"filter": `(uid=${uid})`,
	"scope": "sub",
	"sizeLimit": 1
    };

    ldapClient.search(config.ldapBase, search, function(err, res) {
	res.on('searchEntry', function(entry) {
	    var att = entry.attributes;
	    var fullName = att.find(o => o.type === 'cn')._vals[0].toString();
	    var email = att.find(o => o.type === 'mail')._vals[0].toString();
	    ldapClient.destroy()

	    var resp = `${uid} is ${fullName} <${email}>.`

	    rtm.sendMessage(resp, msg.channel)
		.then((msg) => console.log(`Message sent`))
		.catch(console.error);
	});
    });
};
