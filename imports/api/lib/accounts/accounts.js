import './template/email-templates'

Meteor.methods({
    'accounts.update'(email){
        Meteor.users.update(Meteor.userId(), {
            $set: {'emails.0.address': email}
        })
    },
});

var _setBrowserPolicies = () => {

};