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
  monthlyBal: { //this can be changed to an array but is an object for easier viewing/editing
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

//when alert button is clicked, open the form
  $('#alert').click(function(){

    $(this).toggleClass('alert--x');
    $('#alert-glyph__span--left').toggleClass('alert-glyph__span--left-x');
    $('#alert-glyph__span--right').toggleClass('alert-glyph__span--right-x');
    $('#alert-glyph__span--bottom').toggleClass('alert-glyph__span--bottom-x');
    $('#alert-glyph__exclamation').toggleClass('alert-glyph__exclamation-x');
    $('#alert-text__priority').toggleClass('alert-text__priority--x');
    $('#alert-text__close').toggleClass('alert-text__close--x');
    $('#alert-form').slideToggle(500);

    //re-center the LABELS
    var recenterLabel = (Math.abs($('#alert-text__priority').width() - $('#alert-text__close').width()) / 2) - 4;

    if ($(this).data('open')) {
      $(this).data('open', false);
    } else {
      $(this).data('open', true);
    }

    $('#alert-glyph').toggleClass('alert-glyph--x');

    if ($(this).data('open')) {
      $('#alert-glyph').css('transform', 'translateX('+recenterLabel+'px)');
      $('#alert-text__close').css('left', recenterLabel+'px');
    } else {
      $('#alert-glyph').css('transform', 'translateX(0px)');
    }
  })

  //if IE, workaround bug to check radio inputs on button click
  if (isIE) {
    $('#bug-info__button--every-time').click(function() {
      $("#input--every-time").prop("checked", true);
    });
    $('#bug-info__button--often').click(function() {
      $("#input--often").prop("checked", true);
    });
    $('#bug-info__button--occasionally').click(function() {
      $("#input--occasionally").prop("checked", true);
    });
    $('#bug-info__button--only-once').click(function() {
      $("#input--only-once").prop("checked", true);
    });
  }

  jQuery.fn.extend({
    isDisabled: function() {
      return $(this).hasClass('u_disabled');
    },
    disable: function() {
      $(this).addClass('u_disabled');
    },
    enable: function() {
      $(this).removeClass('u_disabled');
    },
    clickOpenClose: function() {
      //if button is not disabled
      if (!$(this).isDisabled()) {
        //if list isn't already open
        if (!$(this).siblings('.select-list').is(":visible")) {
          //open it
          $(this).siblings('.select-list').slideDown(150);
        } else {
          //close it
          $(this).siblings('.select-list').slideUp(150);
        }
      }
    }
  });

  //open option list when an enabled select button is clicked
  $('.select').click($(this).clickOpenClose);

  //handle click of a device option
  $('.select-list__option--device').click(function(){

    var deviceSelection = $(this).data().value;

    $('#select-list--device').hide();
    //change button color and content and selected attribute
    $('#select--device').addClass('bug-info__button--selected').html($(this).html()).data().selected = true;
    //add value to hidden input
    $('#input--device').val(deviceSelection);
    //remove disabled style on next button
    $('#select--op-sys').enable();
    //hide the invalid options in the next button
    $('.select-list__option--op-sys').each(function(){
      //create array of deviced associated with this op-sys
      var deviceArr = $(this).data().device.split(' ');
      //if this op-sys isn't associated with the selected device, hide it.  else show it.
      if (deviceArr.indexOf(deviceSelection) == -1) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
    //reset later buttons
    $('#select--browser').disable();
    $('#select-list--browser').hide();
    $('#input--op-sys').val('');
    $('#input--browser').val('');
    $('#select--op-sys').removeClass('bug-info__button--selected').html('OPERATING SYSTEM').data().selected = false;
    $('#select--browser').removeClass('bug-info__button--selected').html('BROWSER').data().selected = false;

  });


  //handle click of a op-sys option
  $('.select-list__option--op-sys').click(function(){

    var deviceSelection = $('#input--device').val();

    $('#select-list--op-sys').hide();
    //change button color and content and selected attribute
    $('#select--op-sys').addClass('bug-info__button--selected').html($(this).html()).data().selected = true;
    //add value to hidden input
    $('#input--op-sys').val($(this).data().value);
    //remove disabled style on next button
    $('#select--browser').enable();
    //hide the invalid options in the next button
    $('.select-list__option--browser').each(function(){
      //create array of deviced associated with this op-sys
      var deviceArr = $(this).data().device.split(' ');
      //if this browser isn't associated with the selected device, hide it.  else show it.
      if (deviceArr.indexOf(deviceSelection) == -1) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });

  });

  //handle click of a browser option
  $('.select-list__option--browser').click(function(){

    $('#select-list--browser').hide();
    //change button color and content and selected attribute
    $('#select--browser').addClass('bug-info__button--selected').html($(this).html()).data().selected = true;
    //add value to hidden input
    $('#input--browser').val($(this).data().value);

  });


  //when somewhere other than an open select menu or a select button is clicked, close any open select menu
  $(document).click(function(event) {
    if(!$(event.target).closest('.select-list').length && !$(event.target).is('.select')) {
        if($('.select-list').is(":visible")) {
            $('.select-list').hide();
        }
    }
  });
  
  //handle "detect for me" click
  function detectForMe() {
    var whichBrowser = new WhichBrowser();
    
    $('#input--anything-else').val('AutoDetect: ' + whichBrowser.toString() + '\n' + $('#input--anything-else').val());
    
    //choose a device selection
    switch (whichBrowser.device.type) {
      case 'desktop':
        switch (whichBrowser.os.name) {
          case 'OS X':
          case 'macOS':
          case 'Mac OS X':
            $('.select-list__option--device[data-value="mac"]').trigger( "click" );
            break;
          case 'Windows':
            $('.select-list__option--device[data-value="pc"]').trigger( "click" );
            break;
          default:
            $('.select-list__option--device[data-value="other"]').trigger( "click" );
            break;
        }
        break;
      case 'tablet':
        switch (whichBrowser.os.name) {
          case 'iOS':
            $('.select-list__option--device[data-value="ipad"]').trigger( "click" );
            break;
          case 'Windows':
            $('.select-list__option--device[data-value="win-surface"]').trigger( "click" );
            break;
          case 'Android':
            $('.select-list__option--device[data-value="android-tablet"]').trigger( "click" );
            break;
          default:
            $('.select-list__option--device[data-value="other"]').trigger( "click" );
            break;
        }
        break;
      case 'mobile':
        switch (whichBrowser.os.name) {
          case 'iOS':
            $('.select-list__option--device[data-value="iphone"]').trigger( "click" );
            break;
          case 'Windows Phone':
          case 'Windows Mobile':
            $('.select-list__option--device[data-value="win-phone"]').trigger( "click" );
            break;
          case 'Android':
            $('.select-list__option--device[data-value="android-phone"]').trigger( "click" );
            break;
          default:
            $('.select-list__option--device[data-value="other"]').trigger( "click" );
            break;
        }
        break;
      default:
        $('.select-list__option--device[data-value="other"]').trigger( "click" );
        break;
    }
    
    //choose an OS selection
    switch (whichBrowser.os.name) {
      case 'OS X':
      case 'macOS':
      case 'Mac OS X':
        switch (whichBrowser.os.version.nickname) {
          case 'Sierra':
            $('.select-list__option--op-sys[data-value="osx-12"]').trigger( "click" );
            break;
          case 'El Capitan':
            $('.select-list__option--op-sys[data-value="osx-11"]').trigger( "click" );
            break;
          case 'Yosemite':
            $('.select-list__option--op-sys[data-value="osx-10"]').trigger( "click" );
            break;
          case 'Mavericks':
            $('.select-list__option--op-sys[data-value="osx-9"]').trigger( "click" );
            break;
          case 'Mountain Lion':
            $('.select-list__option--op-sys[data-value="osx-8"]').trigger( "click" );
            break;
          default:
            $('.select-list__option--device[data-value="osx-older"]').trigger( "click" );
            break;
        }
        break;
      case 'Windows':
        switch (whichBrowser.os.version.alias) {
          case '10':
            $('.select-list__option--op-sys[data-value="win-10"]').trigger( "click" );
            break;
          case '8.1':
          case '8':
            $('.select-list__option--op-sys[data-value="win-8"]').trigger( "click" );
            break;
          case '7':
            $('.select-list__option--op-sys[data-value="win-7"]').trigger( "click" );
            break;
          case 'Vista':
            $('.select-list__option--op-sys[data-value="win-vista"]').trigger( "click" );
            break;
          case 'XP':
            $('.select-list__option--op-sys[data-value="win-xp"]').trigger( "click" );
            break;
          case 'RT 8.1':
            $('.select-list__option--op-sys[data-value="win-mob-rt"]').trigger( "click" );
            break;
          default:
            $('.select-list__option--op-sys[data-value="win-older"]').trigger( "click" );
            break;
        }
        break;
      case 'iOS':
        if (whichBrowser.isOs('iOS', '>=', '10')) {
          $('.select-list__option--op-sys[data-value="ios-10"]').trigger( "click" );
        } else if (whichBrowser.isOs('iOS', '>=', '9')) {
          $('.select-list__option--op-sys[data-value="ios-9"]').trigger( "click" );
        } else if (whichBrowser.isOs('iOS', '>=', '8')) {
          $('.select-list__option--op-sys[data-value="ios-8"]').trigger( "click" );
        } else if (whichBrowser.isOs('iOS', '>=', '7')) {
          $('.select-list__option--op-sys[data-value="ios-7"]').trigger( "click" );
        } else if (whichBrowser.isOs('iOS', '>=', '6')) {
          $('.select-list__option--op-sys[data-value="ios-6"]').trigger( "click" );
        } else {
          $('.select-list__option--op-sys[data-value="ios-older"]').trigger( "click" );
        }
        break;
      case 'Android':
        if (whichBrowser.isOs('Android', '>=', '6')) {
          $('.select-list__option--op-sys[data-value="android-6"]').trigger( "click" );
        } else if (whichBrowser.isOs('Android', '>=', '5')) {
          $('.select-list__option--op-sys[data-value="android-5"]').trigger( "click" );
        } else if (whichBrowser.isOs('Android', '>=', '4.4')) {
          $('.select-list__option--op-sys[data-value="android-4-4"]').trigger( "click" );
        } else if (whichBrowser.isOs('Android', '>=', '4.3')) {
          $('.select-list__option--op-sys[data-value="android-4-3"]').trigger( "click" );
        } else {
          $('.select-list__option--op-sys[data-value="android-older"]').trigger( "click" );
        }
        break;
      case 'Windows Phone':
      case 'Windows Mobile':
        if (whichBrowser.isOs('Windows Phone', '>=', '10')) {
          $('.select-list__option--op-sys[data-value="win-mob-10"]').trigger( "click" );
        } else if (whichBrowser.isOs('Windows Phone', '>=', '8')) {
          $('.select-list__option--op-sys[data-value="win-mob-8"]').trigger( "click" );
        } else if (whichBrowser.isOs('Windows Phone', '>=', '7.10')) {
          $('.select-list__option--op-sys[data-value="win-mob-7"]').trigger( "click" );
        } else {
          $('.select-list__option--op-sys[data-value="win-mob-older"]').trigger( "click" );
        }
        break;
      default:
        $('.select-list__option--op-sys[data-value="op-sys-other"]').trigger( "click" );
        break;
    }
    
    
    
    //choose a browser selection.
    switch (whichBrowser.browser.name) {
      case 'Chrome':
        $('.select-list__option--browser[data-value="chrome"]').trigger( "click" );
        break;
      case 'Firefox':
        $('.select-list__option--browser[data-value="firefox"]').trigger( "click" );
        break;
      case 'Safari':
        $('.select-list__option--browser[data-value="safari"]').trigger( "click" );
        break;
      case 'Internet Explorer':
        if (whichBrowser.isBrowser('Internet Explorer', '>=', '9')) {
          $('.select-list__option--browser[data-value="ie-11"]').trigger( "click" );
        } else {
          $('.select-list__option--browser[data-value="ie-older"]').trigger( "click" );
        }
        break;
      case 'Edge':
        $('.select-list__option--browser[data-value="edge"]').trigger( "click" );
        break;
      case 'Opera':
        $('.select-list__option--browser[data-value="opera"]').trigger( "click" );
        break;
      default:
        $('.select-list__option--browser[data-value="browser-other"]').trigger( "click" );
        break;
    }
  }
  
  $('#select-detect').click(detectForMe);

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

    //workaround .getHours timezone bug in IE and Edge
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
