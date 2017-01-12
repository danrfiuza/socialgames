import '../../api/server/modules/_modules.js';
import '../../api/server/modules/configure-services.js';

Meteor.startup(function () {
    Modules.server.configureServices();
});

Meteor.methods({
    'accounts.update'(email){
        Meteor.users.update(Meteor.userId(), {
            $set: {'emails.0.address': email}
        })
    },
});

var _setBrowserPolicies = () => {

};