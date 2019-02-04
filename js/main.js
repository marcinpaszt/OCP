$(function() {
  "use strict";
  /* smooth scroll
  -------------------------------------------------------*/
  $.scrollIt({
    easing: "swing", // the easing function for animation
    scrollTime: 900, // how long (in ms) the animation takes
    activeClass: "active", // class given to the active nav element
    onPageChange: null, // function(pageIndex) that is called when page is changed
    topOffset: -70,
    upKey: 38, // key code to navigate to the next section
    downKey: 40 // key code to navigate to the previous section
  });

  var win = $(window);

  win.on("scroll", function() {
    var wScrollTop = $(window).scrollTop();

    if (wScrollTop > 150) {
      $(".navbar").addClass("navbar-colored");
    } else {
      $(".navbar").removeClass("navbar-colored");
    }
  });

  /* close navbar-collapse when a  clicked */
  $(".navbar-nav a").on("click", function() {
    $(".navbar-collapse").removeClass("show");
  });

  /* scroll-top-btn */
  var scrollButton = $(".scroll-top-btn .fa");
  win.on("scroll", function() {
    if ($(this).scrollTop() >= 700) {
      scrollButton.show();
    } else {
      scrollButton.hide();
    }
  });

  /* Click On scroll-top-btn */
  scrollButton.on("click", function() {
    $("html,body").animate({ scrollTop: 0 }, 1200);
  });

  /* counter */
  $(".count").counterUp({
    delay: 20,
    time: 1500
  });

  /* welcome-slider slider */
  $(".welcome-slider .owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    margin: 0,
    autoplay: false,
    autoplayTimeout: 2800,
    autoplayHoverPause: true,
    smartSpeed: 650,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>'
    ]
  });
  
  /* contact-area section */
  $("#contact-form").validator();

  $("#contact-form").on("submit", function(e) {
    if (!e.isDefaultPrevented()) {
      var url = "contact.php";

      $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(),
        success: function(data) {
          var messageAlert = "alert-" + data.type;
          var messageText = data.message;

          var alertBox =
            '<div class="alert ' +
            messageAlert +
            ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            messageText +
            "</div>";
          if (messageAlert && messageText) {
            $("#contact-form")
              .find(".messages")
              .html(alertBox);
            $("#contact-form")[0].reset();
          }
        }
      });
      return false;
    }
  });
});

$(window).on("load", function() {
  $(".load-wrapp").fadeOut(100);

  /* isotope */
  $(".grid").isotope({
    // options
    itemSelector: ".items"
  });

  var $grid = $(".grid").isotope({
    // options
  });

  // filter items on button click
  $(".filtering").on("click", "span", function() {
    var filterValue = $(this).attr("data-filter");

    $grid.isotope({ filter: filterValue });
  });

  $(".filtering").on("click", "span", function() {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
});

$(document).ready(function() {
  var widget = $(".tab");

  var tabs = widget.find("ul a"),
    content = widget.find(".content > div");

  tabs.on("click", function(e) {
    e.preventDefault();

    // Get the data-index attribute, and show the matching content div

    var index = $(this).data("index");

    tabs.removeClass("tab-active");
    content.removeClass("content-active");

    $(this).addClass("tab-active");
    content.eq(index).addClass("content-active");
  });
});

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
  
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
  
    var autocomplete = new google.maps.places.Autocomplete(input);
  
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);
  
    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);
  
    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });
  
    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
  
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
  
      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }
  
      infowindowContent.children['place-icon'].src = place.icon;
      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent = address;
      infowindow.open(map, marker);
    });
  }