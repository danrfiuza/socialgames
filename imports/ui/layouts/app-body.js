import { Template } from 'meteor/templating';
import '../globals/footer.html';
import '../globals/sidebar.html';
import '../globals/submenu.html';
import '../globals/topnavbar.html';
import '../globals/offsidebar.html';
import './app-body.html';

Template.layout.rendered = function () {
    setTimeout(function () {
        App.run();
    }, 100)
}

Template.layout.helpers({
    sectionClass: function () {
        return 'section-' + Router.current().route.options.path.replace('/', '');
    }
});