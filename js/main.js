




$( document ).ready(function() {



});


window.onload = function onLoad() {

  /* ==========================================================================
     USE THESE VARS TO CONFIGURE DASHBOARD FOR INDIVIDUAL CLIENT
     ========================================================================== */

  var startingMonth = 3; //jan=0, feb=1...
  var monthlyHours = 6;
  var monthlyBal = { //this can be changed to an array but is an object to easier viewing/editing
    0: 0,
    1: 0,
    2: 0,
    3: 4,
    4: 0,
    5: 2,
    6: 6,
    7: 5,
    8: 0,
    9: 0,
    10: 0,
    11: 0
  };
  var annualHours=36;
  var annualBal=17;
  var today = new Date();
  var currentMonth = today.getMonth();
  var animationDuration = 1500;
  var animationEasing = "easeOut";



  /* ==========================================================================
     UPDATE MONTH DATA
     -set monthly used hours
     -set month names
     -animate circular progress bars
     ========================================================================== */

  function updateMonths (i, val) {
    //set monthlyBalIteration to appropriate month based on client's starting month
    var monthlyBalIteration = (startingMonth + i) < 12 ? startingMonth + i : startingMonth + i - 12;

    //set month names based on client starting month
    function getMonthName () {
      switch (monthlyBalIteration) {
        case 0: return 'JAN';
        case 1: return 'FEB';
        case 2: return 'MAR';
        case 3: return 'APR';
        case 4: return 'MAY';
        case 5: return 'JUN';
        case 6: return 'JUL';
        case 7: return 'AUG';
        case 8: return 'SEP';
        case 9: return 'OCT';
        case 10: return 'NOV';
        case 11: return 'DEC';
        default: return 'err'
      }
    }

    var monthName = getMonthName();

    $('#month__name' + i).html(monthName);


    //create circle progress bar
    var circle = new ProgressBar.Circle('#month' + i, {
        strokeWidth: 15,
        color: '#9bd500',
        duration: animationDuration,
        easing: animationEasing,
        trailColor: '#dfdfdf',
        trailWidth: 15,
        text: {
          value: "0",
          className: 'month__bal',
          style: null,
        },
        step: function(state, circle) {

          var value = Math.round(circle.value() * monthlyHours);
          if (value === 0 && monthlyBalIteration <= currentMonth && monthlyBalIteration >= startingMonth) { //if hours used is 0 and month has already occured in current billing year.
            circle.setText('0');
          } else if (value === 0) {
            circle.setText('-');
          } else {
            circle.setText(value);
          }

        }
    });//end of ProgressBar.Circle constructor

    //Animate circular progress bars
    circle.animate(monthlyBal[monthlyBalIteration]/monthlyHours);

  }

  $.each($('.month'), updateMonths)

  /* ==========================================================================
     UPDATE ANNUAL DATA
     -set total avail hours
     -animate progress bar with used hours
     ========================================================================== */

  $('#annual-progress__tot-hours').html(annualHours);

  //create linear progress bar
  var line = new ProgressBar.Line('#annual-progress', {
      color: '#9bd500',

      duration: animationDuration,
      easing: animationEasing,
      trailColor: '#dfdfdf',
      trailWidth: 15,
      svgStyle: {width: '100%', height: '100%'},
      text: {
        value: "0",
        className: 'annual-progress__used-hours',
        style: null,
      },
      step: function(state, line, attachment) {

        var value = Math.round(line.value() * annualHours);
        if (value === 0) {
          line.setText('0');
        } else {
          line.setText(value);
        }

        //animate the circle showing used hours
        if (state.offset) {
          attachment.css({'transform': "translateX("+(line.value()*$('#annual-progress').width())+"px)"});
        }

      }
  });//end of ProgressBar.Line constructor

  line.animate(annualBal/annualHours, {attachment: $('.annual-progress__used-hours')});

};
