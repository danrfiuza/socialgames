import { Meteor } from 'meteor/meteor';

var titleSocial = 'Social Games - A Rede Social dos Board Gamers';

// Configure routes
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

// Autenticate routes
Router.plugin('auth', {
    except: [
        'login',
        'main'
    ]
});

// Maping of routes
Router.map(function(){

    this.route('main', {
        path: '/'
    });

    this.route('login', {
        path: '/login'
    });

    this.route('logoff', function() {
        Meteor.logout();
        Router.go('login');    
    });

    this.route('submenu', {
        path: '/sub/menu'
    });

    this.route('friends', {
        path: '/friends',
        sectionTitle: 'Amigos',
        onAfterAction: function() {
            return document.title = "Amigos | " + titleSocial;
        }
    });

    this.route('games', {
        path: '/games',
        sectionTitle: 'Jogos',
        onAfterAction: function() {
            return document.title = "Jogos | " + titleSocial;
        }
    });

    this.route('matches', {
    path: '/matches',
        sectionTitle: 'Partidas',
        onAfterAction: function() {
            return document.title = "Partidas | " + titleSocial;
        }
    });

    this.route('places', {
        path: '/places',
        sectionTitle: 'Locais',
        onAfterAction: function() {
            return document.title = "Locais | " + titleSocial;
        }
    });

    this.route('rankings', {
        path: '/rankings',
        sectionTitle: 'Rankings',
        onAfterAction: function() {
            return document.title = "Rankings | " + titleSocial;
        }
    });

    this.route('timeline', {
        path: '/timeline',
        sectionTitle: 'Timeline',
        onAfterAction: function() {
            return document.title = "Timeline | " + titleSocial;
        }
    });

    this.route('map', {
        path: '/map'
    });
});
