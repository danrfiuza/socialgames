import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './loginForm.html';

Template.loginForm.events({
    "submit #login-form": function(event, template) {
        event.preventDefault();
        Meteor.loginWithPassword(
            template.find("#login-username").value,
            template.find("#login-password").value,
            function(error) {
                if (error) {
                    swal('Oops...', error.reason, 'error');
                }else{
                    Router.go('dashboard');
                }
            }
        );
    },
    'click [data-social-login]' ( event, template ) {
        conole.log('asdfasd');
        const service = event.target.getAttribute( 'data-social-login' ),
            options = {
                requestPermissions: [ 'email' ]
            };
        Meteor[ service ]( options, ( error ) => {
            if ( error ) {
                // swal('Oops...', error.message, 'error');
            }
        });
    }
});