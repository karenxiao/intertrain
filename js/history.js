// generate the graph that displays user's workout history

$(document).ready(function(){

  var data = JSON.parse(localStorage.getItem("history"));
  data = data || {};  

  if (jQuery.isEmptyObject(data))
  {
    $('#history-chart').html("<p>You don't have any workout history yet.</p>");
    return;
  }

  baseline = [];
  high = [];
  total = [];

  dates = Object.keys(data);
  days = (dates.length >= 7) ? 7 : dates.length;

  for (var i = 0; i < days; i++)
  {
    baseline.push(data[dates[i]]["Baseline"]);
    high.push(data[dates[i]]["High"]);
    total.push(data[dates[i]]["Total"]);

  }
  console.log(data);

  var plot1 = $.jqplot ('history-chart', [total], {
      animate: true,
      animateReplot: true,
      title: 'History for the Past ' + days + ' Days',
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
          // label: "Total Workout Time (min)"
        }
      }
    });

  $("#history-baseline").click(function() {
      plot1.destroy();

      plot1 = $.jqplot ('history-chart', [baseline], {
      animate: true,
      animateReplot: true,
      title: 'History for the Past ' + days + ' Days',
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

  $("#history-high").click(function() {
      plot1.destroy();

      plot1 = $.jqplot ('history-chart', [high], {
      animate: true,
      animateReplot: true,
      title: 'History for the Past ' + days + ' Days',
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

  $("#history-total").click(function() {
      plot1.destroy();

      plot1 = $.jqplot ('history-chart', [total], {
      animate: true,
      animateReplot: true,
      title: 'History for the Past ' + days + ' Days',
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
});