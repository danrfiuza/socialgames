import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

var gamesTop30 = new ReactiveVar(0);

Template.dashboardMostPlayed.onCreated(function () {
    Meteor.call('matchs.gamesTop30', {}, function (e, result) {
        gamesTop30.set(result);
    });
});


Template.dashboardMostPlayed.top30dias = function () {

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
                text: TAPi18n.__('dashboard.TOTAL_MATCHES')
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true
                    // format: '{point.y:.1f}'
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
}
