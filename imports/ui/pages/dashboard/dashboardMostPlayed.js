// var Highcharts = require('highcharts');
//
// if (Meteor.isClient) {
//   Meteor.subscribe("Tasks");
//
//   Template.dashboardMostPlayed.helpers({
//     createChart: function () {
//       // Gather data:
//       var allTasks = Tasks.find().count(),
//             incompleteTask = Tasks.find({checked: {$ne: true}}).count(),
//             tasksData = [{
//                 y: incompleteTask,
//                 name: "Incomplete"
//              }, {
//                  y: allTasks - incompleteTask,
//                  name: "Complete"
//              }];
//       // Use Meteor.defer() to craete chart after DOM is ready:
//       Meteor.defer(function() {
//         // Create standard Highcharts chart with options:
//         Highcharts.chart('chart', {
//           series: [{
//             type: 'pie',
//             data: tasksData
//           }]
//         });
//       });
//     }
//   });
