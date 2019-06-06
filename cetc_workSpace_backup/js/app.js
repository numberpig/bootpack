 (function() {
     var lastTime = 0;
     var vendors = ['ms', 'moz', 'webkit', 'o'];
     for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
         window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
         window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
             window[vendors[x] + 'CancelRequestAnimationFrame'];
     }

     if (!window.requestAnimationFrame)
         window.requestAnimationFrame = function(callback, element) {
             var currTime = new Date().getTime();
             var timeToCall = Math.max(0, 16 - (currTime - lastTime));
             var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                 timeToCall);
             lastTime = currTime + timeToCall;
             return id;
         };

     if (!window.cancelAnimationFrame)
         window.cancelAnimationFrame = function(id) {
             clearTimeout(id);
         };
 }());



 function isElementInViewport(el) {
     var rect = el.getBoundingClientRect();
     return (
         rect.top >= 0 &&
         rect.left >= 150 &&
         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
         rect.right <= (window.innerWidth - 180 || document.documentElement.clientWidth)
     );
 }

 $(document).ready(function() {
     var firstlink = $(".quick.pass dd:first")[0];
     var lastlink = $(".quick.pass dd:last")[0];

     if (isElementInViewport(firstlink)) {
         $("#next").addClass("disabled")

     }
     if (isElementInViewport(lastlink)) {
         $("#prev").addClass("disabled")
     }

     $("#prev").on("click", function() {
         if (isElementInViewport(firstlink)) {
             $("#next").removeClass("disabled")

         }
         if (isElementInViewport(lastlink)) {
             $("#prev").addClass("disabled")
             return;
         }


         var scroll = $(".quick.pass").css("left")
         scroll = Number.parseInt(scroll.replace("px", "")) - 190

         $(".quick.pass").css("left", scroll + "px");

     });
     $("#next").on("click", function() {

         if (isElementInViewport(lastlink)) {
             $("#prev").removeClass("disabled")

         }
         if (isElementInViewport(firstlink)) {
             $("#next").addClass("disabled")
             return;
         }
         var scroll = $(".quick.pass").css("left")
         scroll = Number.parseInt(scroll.replace("px", "")) + 190
         $(".quick.pass").css("left", scroll + "px");

     });

 });
 // var options = {
 //     horizontal: 1,
 //     itemNav: 'basic',
 //     speed: 300,
 //     mouseDragging: 1,
 //     touchDragging: 1
 // };
 // $('#slyframe').sly(options);