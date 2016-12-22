Template.topnavbar.helpers({
    sectionTitle: function () {
        return Router.current().route.options.sectionTitle;
    }
});

Template.layout.helpers({
    sectionClass: function () {
        return 'section-' + Router.current().route.options.path.replace('/', '');
    }
});
