import '../../api/server/modules/_modules.js';
import '../../api/server/modules/configure-services.js';

Meteor.startup(function () {
    Modules.server.configureServices();
});

/*
 let startup = () => {
 //  [...]
 Modules.server.configureServices();
 //  [...]
 };
 */
var _setBrowserPolicies = () => {
//  [...]
};