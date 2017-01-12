import { Template } from 'meteor/templating';
import '../globals/app.init.js';
import '../globals/auth/socialLogin.js';
import '../globals/auth/login.js';
import './app-login.html';

Template.loginLayout.rendered = function () {
    setTimeout(function () {
        App.run();
    }, 100)
}