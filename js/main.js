




$( document ).ready(function() {



});


window.onload = function onLoad() {
  //USE THESE TO CONFIGURE DASHBOARD FOR INDIVIDUAL CLIENT
  var startingMonth = 0; //jan=0, feb=1...
  var monthlyHours = 6;
  var monthlyBal = {
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
          if (value === 0) {
            circle.setText('0');
          } else {
            circle.setText(value);
          }

        }
    });


    //set monthlyBalIteration to appropriate month based on client's starting month
    var monthlyBalIteration = (startingMonth + i) < 12 ? startingMonth + i : startingMonth + i - 12;

    //Animate circular progress bars
    circle.animate(monthlyBal[monthlyBalIteration]/monthlyHours);
  }

  $.each($('.month'), updateMonths)

};
