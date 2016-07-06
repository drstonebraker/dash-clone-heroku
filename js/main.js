




$( document ).ready(function() {



});


//Animate progress bars
window.onload = function onLoad() {
  //USE THESE TO CONFIGURE DASHBOARD FOR INDIVIDUAL CLIENT
  var startingMonth = 1;
  var monthlyHours = 6;
  var monthlyBal = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 0,
    dec: 0
  };
  var annualHours=36;
  var annualBal=16;




    var circle = new ProgressBar.Circle('#progress', {
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
        }
    });

    circle.animate(.75);
};
