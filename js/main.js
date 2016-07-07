




$( document ).ready(function() {



});


window.onload = function onLoad() {
  //USE THESE TO CONFIGURE DASHBOARD FOR INDIVIDUAL CLIENT
  var startingMonth = 0; //jan=0, feb=1...
  var monthlyHours = 6;
  var monthlyBal = { //this can be changed to an array but is an object to easier viewing/editing
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0
  };
  var annualHours=36;
  var annualBal=16;
  var today = new Date();
  var currentMonth = today.getMonth();

  function updateMonths (i, val) {
    //set monthlyBalIteration to appropriate month based on client's starting month
    var monthlyBalIteration = (startingMonth + i) < 12 ? startingMonth + i : startingMonth + i - 12;

    var circle = new ProgressBar.Circle('#month' + i, {
        strokeWidth: 15,
        color: '#9bd500',
        duration: 1300,
        easing: 'easeOut',
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
    });

    //Animate circular progress bars
    circle.animate(monthlyBal[monthlyBalIteration]/monthlyHours);

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
  }

  $.each($('.month'), updateMonths)

  $('#annual-progress__tot-hours').html(annualHours);

};
