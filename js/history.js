// generate the graph that displays user's workout history

$(document).ready(function(){
  var plot1 = $.jqplot ('history-chart', [[3,7,9,1,5,3,8,2,5]], {
      title: 'History for the Past 7 Days',
      axesDefaults: {
        labelRenderer: $.jqplot.CanvasAxisLabelRenderer
      },
      seriesDefaults: {
          rendererOptions: {
              smooth: false
          }
      },
      axes: {
        xaxis: {
          label: "Day of Week",
          // Turn off "padding".  This will allow data point to lie on the
          // edges of the grid.  Default padding is 1.2 and will keep all
          // points inside the bounds of the grid.
          pad: 1.2
        },
        yaxis: {
          label: "Total Workout Time (min)"
        }
      }

    });
});