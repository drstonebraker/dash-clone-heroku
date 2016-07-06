




$( document ).ready(function() {



});

//Animate progress bars
window.onload = function onLoad() {
    var circle = new ProgressBar.Circle('#progress', {
        color: '#9bd500',
        duration: 1000,
        easing: 'easeInOut'
    });

    circle.animate(1);
};
