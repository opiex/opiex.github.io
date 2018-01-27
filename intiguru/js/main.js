/* 
 * Lazy Line Painter - Path Object 
 * Generated using 'SVG to Lazy Line Converter'
 * 
 * http://lazylinepainter.info 
 * Copyright 2013, Cam O'Connell  
 *  
 */ 
 
var svgData = {
    "guru": {
        "strokepath": [
            {
                "path": "M97.926,20.548  c40.816,0,71.429,32.652,71.429,71.769c0,39.115-31.632,71.597-71.599,71.597S25.646,130.41,25.646,91.805  C25.646,53.201,57.109,20.548,97.926,20.548z",
                "duration": 400
            },
            {
                "path": "M112.005,61.89c6.346,0,11.104,5.075,11.104,11.155  s-4.917,11.129-11.129,11.129c-6.213,0-11.21-5.207-11.21-11.208S105.66,61.89,112.005,61.89z",
                "duration": 400
            },
            {
                "path": "M82.005,61.89c6.346,0,11.104,5.075,11.104,11.155  s-4.917,11.129-11.129,11.129c-6.213,0-11.21-5.207-11.21-11.208S75.66,61.89,82.005,61.89z",
                "duration": 400
            },
            {
                "path": "M 93.108 70.444 L 101.075 70.444",
                "duration": 400
            },
            {
                "path": "M 88.706 92.317 L 105.456 92.317",
                "duration": 400
            },
            {
                "path": "M 121.223,82.48 L 146.956,127.693   45.706,127.693 72.767,82.487 ",
                "duration": 400
            },
            {
                "path": "M 86.706,59.94 L 96.081,42.194   106.938,60.194 ",
                "duration": 400
            }
        ],
        "dimensions": {
            "width": 194,
            "height": 183
        }
    }
}; 
 
var welcomeMessage = 'Hello! I’m intiguru, but you can call me inti.<br> I’m the most advanced bot in the world. I was developed by apple (a real apple, not the company) to do some really advanced computations and smart stuff.<br> Feel free to ask me ANYTHING.'

function fillWelcomeMessage(){
    $("#welcome-text").typed({
        strings: [welcomeMessage],
        typeSpeed: 10
      });
}

(function ($) {
    $.fn.shake = function (options) {
        // defaults
        var settings = {
            'shakes': 2,
            'distance': 10,
            'duration': 400
        };
        // merge options
        if (options) {
            $.extend(settings, options);
        }
        // make it so
        var pos;
        return this.each(function () {
            $this = $(this);
            // position if necessary
            pos = $this.css('position');
            if (!pos || pos === 'static') {
                $this.css('position', 'relative');
            }
            // shake it
            for (var x = 1; x <= settings.shakes; x++) {
                $this.animate({ left: settings.distance * -1 }, (settings.duration / settings.shakes) / 4)
                    .animate({ left: settings.distance }, (settings.duration / settings.shakes) / 2)
                    .animate({ left: 0 }, (settings.duration / settings.shakes) / 4);
            }
        });
    };
}(jQuery));


function scrollToBottom(){
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
  return false;
}

var flag = 0;
var current = 1;

setTimeout(function(){
    flag = 1;
}, 2000);


var fadeFromLeft = function(message){
message.css({"position":"relative","opacity": 0, "right":"+=30"});
 message.animate({right:0, opacity:1},300);
 scrollToBottom();
 setTimeout(function(){
    message.children('.loader').fadeOut();
    message.children('span').fadeIn();
    scrollToBottom();
}, 1500);

}

var fadeFromRight = function(message){
message.css({"position":"relative","opacity": 0, "left":"+=30"});
 message.animate({left:0, opacity:1},300);
 scrollToBottom();
}


$('.chat-bubble').hide();
var currentStringIndex = 0;

$('input').keypress(function(e) {
    var currentMessage = $('#chat' + current).find('span').html();

    e.preventDefault();
    if(e.which == 13) {
    currentStringIndex = 0;
    $('#chatenter').val("");
    console.log(currentMessage);
    if(flag === 1){
        var currentElement = $('#chat' + current);
        if(currentElement.hasClass("userchat")){
            currentElement.show();
            fadeFromRight(currentElement);
            current++;

            var currentElement = $('#chat' + current);
            currentElement.show();
            fadeFromLeft(currentElement);
            current++;

            if(current === 15){
            var currentElement = $('#chat' + current);
            setTimeout(function(){
                currentElement.show();
                fadeFromLeft(currentElement);
            }, 500);
            current++;
            }

        }
        if(current === 18){
            flag = 0;
        }
}
else{
    /*alert('can\'t ask questions. sorry!');*/
    $('#chatenter').shake();

}}
else{
    currentStringIndex++;
    var res = currentMessage.substr(0,currentStringIndex);
    $('#chatenter').val(res);
}
});

 function load(){
 
 $(document).ready(function(){ 
 $('#logo').lazylinepainter( 
 {
    "svgData": svgData,
    "strokeWidth": 2,
    "strokeColor": "#f89a2c"
}).lazylinepainter('paint'); 
 });

 $('.header h2').fadeIn();

var welcome = $('#chat0');
welcome.show();
fadeFromLeft(welcome);
setTimeout(fillWelcomeMessage, 3000);

$('.textbox').fadeIn();
 }

 load();