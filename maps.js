  // function initialize() {
  //         var mapCanvas = document.getElementById('map-canvas');
  //         var mapOptions = {
  //           center: new google.maps.LatLng(37.7833, -122.4167),
  //           zoom: 12,
  //           mapTypeId: google.maps.MapTypeId.ROADMAP
  //         }
  //         var map = new google.maps.Map(mapCanvas, mapOptions)
  //       }
  //       google.maps.event.addDomListener(window, 'load', initialize);

  function geoFindMe() {
    var output = document.getElementById("out");

    if (!navigator.geolocation){
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }

    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;

      output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

      var img = new Image();
      img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

      output.appendChild(img);
    };

    function error() {
      output.innerHTML = "Unable to retrieve your location";
    };

    output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error);
  }