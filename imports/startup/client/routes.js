import { Meteor } from 'meteor/meteor';

// Import to load these templates
import '../../ui/layouts/app-body.js';

import '../../ui/pages/timeline/timeline.js';
import '../../ui/pages/game/game.js';
import '../../ui/pages/game/newgame.js';
import '../../ui/pages/friends/friend.js';
import '../../ui/pages/main/main.js';
import '../../ui/pages/mach/match.js';
import '../../ui/pages/place/place.js';
import '../../ui/pages/ranking/ranking.js';
import '../../ui/pages/dashboard/dashboard.js';

import '../../ui/globals/app.init.js';
import '../../ui/globals/custom.js';
import '../../ui/globals/auth/login.js';
import '../../ui/globals/sidebars.js';
import '../../ui/globals/topnavbar.js';

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

    this.route('newgame', {
        path: '/newgame',
        sectionTitle: 'Novo Jogo',
        onAfterAction: function() {
            return document.title = "Novo Jogo | " + titleSocial;
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

    this.route('dashboard', {
        path: '/dashboard',
        sectionTitle: 'Dashboard',
        onAfterAction: function() {
            return document.title = "Dashboard | " + titleSocial;
        }
    });

    this.route('map', {
        path: '/map'
    });
});
