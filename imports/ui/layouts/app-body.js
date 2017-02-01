import {Template} from "meteor/templating";
import "../globals/app.init.js";
import "../globals/custom.js";
import "../components/angle/modules/bootstrap-start.js";
import "../components/angle/modules/clear-storage.js";
import "../components/angle/modules/constants.js";
import "../components/angle/modules/localize.js";
import "../components/angle/modules/navbar-search.js";
import "../components/angle/modules/sidebar.js";
import "../components/angle/modules/toggle-state.js";
import "../components/angle/modules/utils.js";
import "../components/avatar/avatar.js";
import "../globals/footer.html";
import "../globals/sidebar.html";
import "../globals/submenu.html";
import "../globals/topnavbar.html";
import "../globals/offsidebar.html";
import "./app-body.html";

Template.layout.rendered = function () {
    setTimeout(function () {
        App.run();
    }, 100)
}

Template.layout.helpers({
    sectionClass: function () {
        var css = 'section-';
        var route = Router.current().route.options.path.split('/')[1];
        if (Meteor.userId()) {
            return 'wrapper ' + css + route;
        } else {
            return css + route;
        }
    }
});