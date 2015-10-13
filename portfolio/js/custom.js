// preloader
$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets    
});

$(function() {
    new WOW().init();
    $('.templatemo-nav').singlePageNav({
    	offset: 70
    });

    /* Hide mobile menu after clicking on a link
    -----------------------------------------------*/
    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
})
$(document).ready(function () {
  function initialize() {
        var location1 = new google.maps.LatLng('35.88250', '76.51333');
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            draggable: false,
            disableDefaultUI: false,
            center: new google.maps.LatLng('35.88250', '76.51333'),
            zoom: 8,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{"stylers":[{"hue":"#2c3e50"},{"saturation":250}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":50},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]}]
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);
        var marker = new google.maps.Marker({
            position: location1,
            map: map
            
            
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
});