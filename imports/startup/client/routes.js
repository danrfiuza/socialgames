import {Meteor} from 'meteor/meteor';

// Import to load these templates
<<<<<<< HEAD
import '../../ui/layouts/app-body.js';
import '../../ui/layouts/app-login.js';

import '../../ui/pages/timeline/timeline.js';
import '../../ui/pages/game/game.js';
import '../../ui/pages/game/newgame.js';
import '../../ui/pages/friends/friend.js';
import '../../ui/pages/main/main.js';
import '../../ui/pages/mach/match.js';
import '../../ui/pages/mach/schedule.js';
import '../../ui/pages/place/place.js';
import '../../ui/pages/ranking/ranking.js';
import '../../ui/pages/dashboard/dashboard.js';

import '../../ui/globals/app.init.js';
import '../../ui/globals/custom.js';
import '../../ui/globals/sidebars.js';
import '../../ui/globals/topnavbar.js';
import '../../ui/globals/auth/login.js';
import '../../ui/globals/auth/logout.js';
import '../../ui/globals/auth/loginForm.js';
import '../../ui/globals/auth/signInWithEmail.js';
=======
import '../../ui/layouts/app-body';
import '../../ui/layouts/app-login';
import '../../ui/layouts/app-not-found.html';

import '../../ui/pages/timeline/timeline';
import '../../ui/pages/game/game';
import '../../ui/pages/game/newgame';
import '../../ui/pages/friends/friend';
import '../../ui/pages/main/main';
import '../../ui/pages/mach/match';
import '../../ui/pages/place/place';
import '../../ui/pages/ranking/ranking';
import '../../ui/pages/dashboard/dashboard';

import '../../ui/globals/app.init';
import '../../ui/globals/custom';
import '../../ui/globals/sidebars';
import '../../ui/globals/topnavbar';
import '../../ui/globals/auth/login';
import '../../ui/globals/auth/logout';
import '../../ui/globals/auth/loginForm';
import '../../ui/globals/auth/signInWithEmail';
>>>>>>> fde14a0f76a47c1946fd87d4cd09c3de9945ede5

var titleSocial = 'Social Games - A Rede Social dos Board Gamers';

// Configure routes
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

// Autenticate routes
Router.plugin('auth', {
    except: [
        'login',
        'signInWithEmail',
        'recoverPassword',
        'main'
    ]
});

// Maping of routes
Router.map(function () {

    this.route('main', {
        path: '/'
    });

    this.route('signInWithEmail', {
        path: '/signInWithEmail',
        layoutTemplate: 'loginLayout'
    });

    this.route('recoverPassword', {
        path: '/recoverPassword',
        layoutTemplate: 'loginLayout'
    });

    this.route('login', {
        path: '/login',
        layoutTemplate: 'loginLayout',
        onRun: function () {
            var currentUser = Meteor.userId();
            if (currentUser) {
                Router.go('dashboard');
            } else {
                this.render("login");
            }
        }
    });

    this.route('logout', function () {
        path: '/logout'
    });

    this.route('submenu', {
        path: '/sub/menu'
    });

    this.route('friends', {
        path: '/friends',
        sectionTitle: 'Amigos',
        onAfterAction: function () {
            return document.title = "Amigos | " + titleSocial;
        }
    });

    this.route('games', {
        path: '/games',
        sectionTitle: 'Jogos',
        onAfterAction: function () {
            return document.title = "Jogos | " + titleSocial;
        }
    });

    this.route('newgame', {
        path: '/newgame',
        sectionTitle: 'Novo Jogo',
        onAfterAction: function () {
            return document.title = "Novo Jogo | " + titleSocial;
        }
    });

    this.route('matches', {
        path: '/matches',
        sectionTitle: 'Partidas',
        onAfterAction: function () {
            return document.title = "Partidas | " + titleSocial;
        }
    });

    this.route('schedule', {
        path: '/schedule/:match_id',
        sectionTitle: 'Partida Agendada',
        onAfterAction: function () {
            return document.title = "Partidas | " + titleSocial;
        }
    });

    this.route('schedules', {
        path: '/schedules',
        sectionTitle: 'Partidas Agendadas',
        onAfterAction: function () {
            return document.title = "Partidas | " + titleSocial;
        }
    });

    this.route('places', {
        path: '/places',
        sectionTitle: 'Locais',
        onAfterAction: function () {
            return document.title = "Locais | " + titleSocial;
        }
    });

    this.route('rankings', {
        path: '/rankings',
        sectionTitle: 'Rankings',
        onAfterAction: function () {
            return document.title = "Rankings | " + titleSocial;
        }
    });

    this.route('timeline', {
        path: '/timeline',
        sectionTitle: 'Timeline',
        onAfterAction: function () {
            return document.title = "Timeline | " + titleSocial;
        }
    });

    this.route('dashboard', {
        path: '/dashboard',
        sectionTitle: 'Dashboard',
        onAfterAction: function () {
            return document.title = "Dashboard | " + titleSocial;
        }
    });

    this.route('map', {
        path: '/map'
    });
});
