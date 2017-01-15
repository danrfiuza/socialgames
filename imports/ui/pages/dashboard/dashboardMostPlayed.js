import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

var gamesTop30 = new ReactiveVar(0);


Template.dashboardMostPlayed.top30dias = function () {

    Meteor.call('matchs.gamesTop30', {}, function (e, result) {
        gamesTop30.set(result);
        // console.log(result);
    });

    // console.log(gamesTop30.get().totalPartidas);


    higthChars = {
        chart: {
            type: 'column',
            height: 245
        },
        title: {
            text: ''
        },
        /*subtitle: {
         text: 'Click the columns to view versions. Source: <a href="http://netmarketshare.com">netmarketshare.com</a>.'
         },*/
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total de partidas'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        /*tooltip: {
         headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
         pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         },*/

        series: top30seriesHightcharts()
    };

    return higthChars;
};

function top30seriesHightcharts() {

    var data = [];
    _.map(gamesTop30.get().arrObj, function (value) {
        data.push({
            name: value.name,
            y: value.totalPartidas30dias,
            drilldown: value.name
        });
    });

    return [{data: data}];

    // return [{
    //     name: 'Brands',
    //     colorByPoint: true,
    //     data: [{
    //         name: 'One Night Ultimate',
    //         y: 56.33,
    //         drilldown: 'One Night Ultimate'
    //     }, {
    //         name: 'Catan',
    //         y: 24.03,
    //         drilldown: 'Catan'
    //     }, {
    //         name: 'Resistance',
    //         y: 10.38,
    //         drilldown: 'Resistance'
    //     }, {
    //         name: 'Sheriff of Nottingham',
    //         y: 4.77,
    //         drilldown: 'Sheriff of Nottingham'
    //     }, {
    //         name: 'Abyss',
    //         y: 0.91,
    //         drilldown: 'Abyss'
    //     }, {
    //
    //         name: 'Outros',
    //         y: 0.2,
    //         drilldown: null
    //     }]
    // }];
}
