var React = require('react/addons');
var inputClassnames = require('classnames');
var ScenicStore = require('../stores/Stores.jsx');
var Actions = require('../stores/Actions.jsx');
var Navigate = require('../stores/Navigate.jsx');
var Analytics = require('../stores/Analytics.jsx');

var inputClasses = inputClassnames('typeahead', 'validate');
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

//  function toggleFullScreen(){
//   if ($(window).width() <= 800 && isSafari == false) {
//     var doc = window.document;
//     var docEl = doc.documentElement;
//     var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
//     var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

//     if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
//       requestFullScreen.call(docEl);
//     } else {
//       cancelFullScreen.call(doc);
//     }
//   }
// };

var Endpoints = React.createClass({
  getInitialState: function(){
    console.log("In Endpoints");
    return {
      "origin": {},
      "destination": {},
      "greenpoints": [],
      "origin_error": false,
      "destination_error": false
    };
  },
  componentDidMount: function(){
    window._endP = this;
    var geocoder = new google.maps.Geocoder();
    $('.typeahead').typeahead(null, {
      displayKey: 'description',
      source: Navigate.getSuggestions,
      templates:{
        suggestion: function(data){
          if (data && data.terms[0] && data.terms[1] && data.terms[2] && data.terms[3])
            return "<div class='tt-address'>"+data.terms[0].value+"</div><div class='tt-locale'>"+ [data.terms[1].value, data.terms[2].value, data.terms[3].value].join(', ')+"</div>";
          else if (data && data.terms[0] && data.terms[1] && data.terms[2])
            return "<div class='tt-address'>"+data.terms[0].value+"</div><div class='tt-locale'>"+ [data.terms[1].value, data.terms[2].value].join(', ')+"</div>";
          else {
            return "<div class='tt-address'>"+data.terms[0].value+"</div><div class='tt-locale'>Toronto, ON</div>";
          }
        }
      },
      limit: 3,
      minLength: 4
    });
    var _this = this;
    $('.typeahead').on('typeahead:selected', function(){
      // reset error state!
      var err = {};
      err[this.id + '_error'] = false;
      _this.setState(err);
    });

    // Attach keydown handlers for the inputs
    $(document).on('keydown','#origin', function(e){
      if (e.keyCode == 13){
        e.preventDefault();
        if (document.getElementById('destination')){
          console.log("triggered");
          $("#destination").focus();
        }
        else{
          if ($(window).width() <= 800){
            setTimeout( function() {
              $("#submitRoute").focus();
            },500);
          }
        }
      }
    }).on('keydown','#destination', function(e){
      if (e.keyCode == 13){
        e.preventDefault();
        if ($(window).width() <= 800){
          setTimeout( function() {
            $("#submitRoute").focus();
          },500);
        }
      }
    });
  },
  // Looks at the store state and decides whether
  // to show one or two inputs.
  routeInputs: function(){
      console.log("Returning Route Inputs");
      if (this.props.loop){
        // Show looping inputs!
        console.log("I'M LOOPING");
        return [
              <div className="introTag">i am</div>,
              <div className="input-field">
                <div onClick={this.geolocateUser} className="yourLoc"></div>
                <input id="origin" type="text" tabIndex="1" className={inputClasses} required/>
                <label className="active" htmlFor="origin">looping from</label>
              </div>,
              <label className='error_label' htmlFor="origin" data-error="message here" data-success="right">
                {this.state.origin_error}
              </label>
        ];
      }
      else{
        // Show routing inputs
        console.log("I'M ROUTING!");
        return [
              <div className="introTag">i am</div>,
              <div className="input-field">
                <div onClick={this.geolocateUser} className="yourLoc"></div>
                <input id="origin" type="text" className={inputClasses} tabIndex="1" required/>
                <label className="active" htmlFor="origin">starting here</label>
              </div>,
              <label className='error_label' htmlFor="origin" data-error="message here" data-success="right">
                {this.state.origin_error}
              </label>,
              <div className="input-field">
                <input id="destination" type="text" name="destination" className={inputClasses} tabIndex="2" required/>
                <label className="active" htmlFor="origin">going there</label>
              </div>,
              <label className='error_label' htmlFor="destination" data-error="message here" data-success="right">
                {this.state.destination_error}
              </label>
        ];
      }
  },
  geolocateUser: function(){
      var _this = this;

      function showError(){
        alert("User declined");
        Actions.deactivateError();
      }
      if (navigator.geolocation) {
          Actions.activateError('location');
          navigator.geolocation.getCurrentPosition(function (position) {
              console.log('Grabbed current location!');


              var latitude = position.coords.latitude;
              var longitude = position.coords.longitude;
              var latlng = new google.maps.LatLng(latitude, longitude);
              var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                location: latlng,
            }, function(results, status){
                        if (status == google.maps.GeocoderStatus.OK) {
                          console.log(results);
                          // Grab the most likely candidate for the reverse geocode lookup.
                          if (results[0]){
                            //setting store with destination sessions state////////////////
                            console.log("REVERSE GEOCODE HERE");
                            console.log(results[0]);
                            var _Name = results[0].formatted_address;
                            _Name = _Name.split(',', 1).join("");
                            Actions.setSessionState('originName', _Name );
                            // See if we can avoid using jQuery here...
                            $('#origin').val(_Name)

                            Actions.setSessionState('origin', {
                              "latLng": L.latLng(
                                            results[0].geometry.location.lat(),
                                            results[0].geometry.location.lng()
                                        )
                            });
                          } else {
                            Analytics.locationError(_id);
                            var err = {};
                            err['origin_error'] = "we're only able to map greenlanes in toronto. please try again";
                            _this.setState(err)
                            // alert('No results found for ' + _id);
                          }
                        }
                        else{
                            Analytics.locationError(_id);
                            var err = {};
                            err['origin_error'] = "we're only able to map greenlanes in toronto. please try again";
                            _this.setState(err)
                        }
                    Actions.deactivateError();
                })

          }, showError, {timeout:5000});
      }
      else{
        Actions.activateError('nogeolocation');
      }
  },
  validate: function(){
    var geocoder = new google.maps.Geocoder();

    var TorontoBbox = new google.maps.LatLngBounds(
        new google.maps.LatLng(43.581, -79.6393),
        new google.maps.LatLng(43.8555, -79.1152)
    );

    var validated = true;

    // the following deal with the async validtion
    var inputCount = document.getElementsByClassName('input-field').length;
    var validatedCount = 0;

    var _this = this;
    $('.distContainer input[required]').map(function(){
        if (!this.value){
          var err = {};
          err[this.id + '_error'] = this.id + ' must be filled';
          _this.setState(err)
        }
        else{
            var _value = this.value;
            var _id = this.id;

            geocoder.geocode({
                address: this.value,
                bounds:  new google.maps.LatLngBounds(
                      new google.maps.LatLng(43.581, -79.6393),
                      new google.maps.LatLng(43.8555, -79.1152)
            )}, function(results, status){
                        if (status == google.maps.GeocoderStatus.OK) {
                          // Grab the most likely candidate for the reverse geocode lookup.

                          if (results[0] && (results[0].geometry.location.lng()>-79.6393) && (results[0].geometry.location.lng()<-79.1152) && (results[0].geometry.location.lat()>43.581) && (results[0].geometry.location.lat() < 43.8555) ){

                            //setting store with destination sessions state////////////////
                            var _Name = _value;
                            _Name = _Name.split(',', 1).join("");
                            Actions.setSessionState(_id + 'Name', _Name );
                            // Modify the state value to represent the updated values.
                            // x.geometry.location returns a google.map.LatLng object
                            Actions.setSessionState(_id, {
                              "latLng": L.latLng(
                                            results[0].geometry.location.lat(),
                                            results[0].geometry.location.lng()
                                        )
                            });

                            // proceed to the next page ONLY after
                            // processing the input field args
                            ++ validatedCount;
                            (validatedCount == inputCount) ? addLoc() : null;

                          } else {
                            var err = {};
                            Analytics.locationError(_id.toUpperCase());
                            err[_id + '_error'] = "we're only able to map greenlanes in toronto. please try again";
                            _this.setState(err)
                            // alert('No results found for ' + _id);
                          }
                        }
                        else{
                            var err = {};
                            Analytics.locationError(_id.toUpperCase());
                            err[_id + '_error'] = "we're only able to map greenlanes in toronto. please try again";
                            _this.setState(err)
                        }
                })
            }
    });


    return false;
  },
  render: function() {
    return (
        <div className="distContainer row">
            {
              this.routeInputs().map(function(reactComponent){
                return reactComponent;
              })
            }
          <button id='submitRoute' onClick={this.validate} tabIndex="3" className="btn-secondary col s9 offset-s1.5 m6 offset-m3">continue
          </button>
        </div>
    );
  }
});

module.exports = Endpoints;
