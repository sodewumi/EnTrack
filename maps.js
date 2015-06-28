  $(document).ready(function () {

        $("#logout").hide();
        $("#message").hide();

        function geoFindMe(success) {
          var output = document.getElementById("out");

          if (!navigator.geolocation){
            output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
            return;
          }
    
          function error() {
            output.innerHTML = "Unable to retrieve your location";
          };

          output.innerHTML = "<p>Locating…</p>";
          navigator.geolocation.getCurrentPosition(success, error, {timeout: 30000, enableHighAccuracy: true, maximumAge: 75000});
        };

        function authDataCallback(authData) {
          if (authData) {
            console.log("User" + authData.uid + " is logged in with " + authData.provider);
            $("#logout").show();
          
          } else {
            console.log("User is logged out");
            $("#login").show();
          }
        }
        
          var ref = new Firebase("https://entrack.firebaseio.com/");

          ref.onAuth(authDataCallback);
          ref.offAuth(authDataCallback);

          var authData = ref.getAuth();
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
          $("#logout").show();
        

      } else {
        console.log("User is logged out");
        $("#login").show();
        $("#logout").hide();
      }

          $("#login").click(function () {
            ref.authWithOAuthPopup("github", function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
            } else {
              var usersRef = ref.child("usernames").child(authData.uid);
              console.log("Authenticated successfully with payload:", authData);
              
                function setData(position) {

                    var latitude  = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    console.log (latitude, longitude)

                  usersRef.set({
                  username: {
                    name: $("#username").val()              
                  },
                  location: { 
                    latitude: latitude,
                    longitude: longitude
                  }
                  
                });

                $("#username").hide();
                  $("#login").hide();
                  $("#logout").show();
                  $("#message").show();
                 
                }
              geoFindMe(setData);

          }
        });
      });

      $("#logout").click(function () {
        ref.unauth();
        $("#login").show();
        $("#username").text("");
        $("#username").show();
        $("#logout").hide();
      });
    

          $("#submit").click(function () {
            var username = $("#username").val();
            var message = $("#message").val();
            ref.child("messages").push({
                username: username,
                message: message
            });
          });

          ref.child("messages").on("child_added", function (snapshot) {
            var value = snapshot.val();
            var html = $("<li/>").text(value.username + " said " + value.message);
            $("#chat-buffer").append(html);
          });


          $("#tracker").click(function(){
            setInterval(function() {console.log("hello")}, 200);

          })
      });