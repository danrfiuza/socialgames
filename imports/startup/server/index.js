import '../../api/lib/modules/_modules.js';
import '../../api/lib/configure-services.js';
import '../../api/lib/emailSMTPConfig';
import '../../api/lib/accounts.js';
import '../../api/lib/register-api.js';

Meteor.startup(function () {
    Modules.server.configureServices();
});