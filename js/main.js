




$( document ).ready(function() {



});



//USE THESE TO CONFIGURE DASHBOARD FOR INDIVIDUAL CLIENT
var startingMonth = 1;
var monthlyHours = 6;
var monthlyBal = {
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0
};
var annualHours=36;
var annualBal=16;
var today = new Date();
var currentMonth = today.getMonth() + 1;

var circle = new ProgressBar.Circle('#month' + startingMonth, {
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

//Animate progress bars
window.onload = function onLoad() {

    circle.animate(1);
};
