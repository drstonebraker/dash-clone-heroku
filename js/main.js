var today = new Date();
var currentMonth = today.getMonth();

/* ==========================================================================
   USE THESE VARS TO CONFIGURE DASHBOARD FOR INDIVIDUAL CLIENT
   ========================================================================== */
var animationDuration = 1500;
var animationEasing = "easeOut";

var clientData = {
  startingMonth: 3, //jan=0, feb=1...
  monthlyHours: 6,
  monthlyBal: { //this can be changed to an array but is an object to easier viewing/editing
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
  },
  annualHours: 36,
  annualBal: 17,
  lastBackup: new Date('2016-12-14T07:32:00'),
  monthlyBenefits: '',
};
//$('#benefits-modal__text').html(clientData.monthlyBenefits); //uncomment this and add client's description of monthly benefits

//end of configurable vars

//detect IE and Edge
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;

$( document ).ready(function() {
  $('#alert').click(function(){

    $(this).toggleClass('alert--x');
    $('#alert-glyph__span--left').toggleClass('alert-glyph__span--left-x');
    $('#alert-glyph__span--right').toggleClass('alert-glyph__span--right-x');
    $('#alert-glyph__span--bottom').toggleClass('alert-glyph__span--bottom-x');
    $('#alert-glyph__exclamation').toggleClass('alert-glyph__exclamation-x');
    $('#alert-text__priority').toggleClass('alert-text__priority-x');
    $('#alert-text__close').toggleClass('alert-text__close-x');

    //re-center the LABELS
    var recenterLabel = (Math.abs($('#alert-text__priority').width() - $('#alert-text__close').width()) / 2) - 4;

    if ($(this).data('open')) {
      $(this).data('open', false);
    } else {
      $(this).data('open', true);
    }

    if ($(this).data('open')) {
      $('#alert-glyph').css('transform', 'translateX('+recenterLabel+'px)');
      $('#alert-text__close').css('left', recenterLabel+'px');
    } else {
      $('#alert-glyph').css('transform', 'translateX(0px)');
    }
  })


});





window.onload = function onLoad() {

  //highlight current month
  $('#month--' + (currentMonth - clientData.startingMonth)).addClass('month--current');

  //fill last backup date & time
  function getlastBackupString(date) {
    var amOrPm;
    var fullHour = date.getHours();
    var twelveHour;
    var doubleDigitMins;

    if (isIE || isEdge) {
      var timezoneDiff = Math.floor(date.getTimezoneOffset() / 60);
      fullHour -= timezoneDiff; 
    }

    //set AM or PM and convert .getHours to 12-hour time.
    if (fullHour > 11){
      amOrPm = 'PM';
      twelveHour = (fullHour > 12) ? fullHour - 12 : fullHour;
    } else if (fullHour == 0) {
      amOrPm = 'AM';
      twelveHour = 12;
    } else {
      amOrPm = 'AM';
      twelveHour = fullHour;
    }

    //ensure minutes are double digits
    if (date.getMinutes() < 10) {
      doubleDigitMins = '0' + date.getMinutes();
    } else {
      doubleDigitMins = '' + date.getMinutes();
    }


    var lastBackupString =
      '' + (date.getMonth() + 1) + '/'
      + (date.getDate() + 1) + '/'
      + date.getFullYear().toString().slice(-2) + ' · '
      + twelveHour + ':'
      + doubleDigitMins
      + amOrPm;

    return lastBackupString;
  }

  $('#backup__datetime').html(getlastBackupString(clientData.lastBackup));

  //set stroke width to 6 if browser is IE (to workaround bug)
  if (isIE || isEdge) {
    var strokeWidth = 6;
    } else {
    var strokeWidth = 15;
  }




  /* ==========================================================================
     UPDATE CLIENT MONTH DATA
     -set monthly used hours
     -set month names
     -animate circular progress bars
     ========================================================================== */

  function updateMonths (i, val) {
    //set monthlyBalIteration to appropriate month based on client's starting month
    var monthlyBalIteration = (clientData.startingMonth + i) < 12 ? clientData.startingMonth + i : clientData.startingMonth + i - 12;

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
    var circle = new ProgressBar.Circle('#month__circle--' + i, {
        strokeWidth: strokeWidth,
        color: '#9bd500',
        duration: animationDuration,
        easing: animationEasing,
        trailColor: '#dfdfdf',
        trailWidth: strokeWidth,
        text: {
          value: "0",
          className: 'month__bal',
          style: null,
        },
        step: function(state, circle) {

          var value = Math.round(circle.value() * clientData.monthlyHours);
          if (value === 0 && monthlyBalIteration <= currentMonth && monthlyBalIteration >= clientData.startingMonth) { //if hours used is 0 and month has already occured in current billing year.
            circle.setText('0');
          } else if (value === 0) {
            circle.setText('-');
          } else {
            circle.setText(value);
          }

        }
    });//end of ProgressBar.Circle constructor

    //Animate circular progress bars
    circle.animate(clientData.monthlyBal[monthlyBalIteration]/clientData.monthlyHours);

  }

  $.each($('.month'), updateMonths)

  /* ==========================================================================
     UPDATE ANNUAL DATA
     -set total avail hours
     -animate progress bar with used hours
     ========================================================================== */

  $('#annual-progress__tot-hours').html(clientData.annualHours);

  //create linear progress bar
  var line = new ProgressBar.Line('#annual-progress', {
      color: '#9bd500',
      strokeWidth: strokeWidth,
      duration: animationDuration,
      easing: animationEasing,
      trailColor: '#dfdfdf',
      trailWidth: strokeWidth,
      svgStyle: {width: '100%', height: '100%'},
      text: {
        value: "0",
        className: 'annual-progress__used-hours',
        style: null,
      },
      step: function(state, line, attachment) {

        var value = Math.round(line.value() * clientData.annualHours);
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

  //workaround for progressbar.js IE bug
  if (isIE || isEdge) {
    $('#annual-progress').css('height', '3');
    $('.annual-progress__used-hours').css('margin-top', '-10px');
    $('#annual-progress__tot-hours').css('margin-top', '-10px');
  }

  line.animate(clientData.annualBal/clientData.annualHours, {attachment: $('.annual-progress__used-hours')});

};

//keep .annual-progress__used-hours in correct position on resize
$(window).resize(function(){
    $('.annual-progress__used-hours').css({'transform': "translateX("+(clientData.annualBal/clientData.annualHours)*$('#annual-progress').width()+"px)"});
});
