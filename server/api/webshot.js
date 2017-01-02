import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'webshot.snap' () {
		webshot("http://google.com", "/home/andre/tmp/google.png", { phantomPath: '/usr/bin/phantomjs' }, function (err) {
		});
    }
});