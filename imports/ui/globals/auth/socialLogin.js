import { Template } from 'meteor/templating';
import './socialLogin.html';

Template.socialLogin.events({
    'click [data-social-login]' ( event, template ) {
        const service = event.target.getAttribute( 'data-social-login' ),
            options = {
                requestPermissions: [ 'email' ]
            };
        Meteor[ service ]( options, ( error ) => {
            if ( error ) {
                swal('Oops...', error.message, 'error');
            }else{
                Router.go('dashboard');
            }
        });
    }
});