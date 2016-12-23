import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	Accounts.loginServiceConfiguration.remove({
	    service: 'facebook'
	});
	Accounts.loginServiceConfiguration.insert({
		service: "facebook",
		appId: "1233584766721520",
		secret: "65e3b4353cdd85270fc90e1bf84fe336",
	});
});

