var React = require('react/addons');
var inputClassnames = require('classnames');
var ScenicStore = require('../stores/Stores.jsx');
var Actions = require('../stores/Actions.jsx');
var Navigate = require('../stores/Navigate.jsx');
var Analytics = require('../stores/Analytics.jsx');

var inputClasses = inputClassnames('typeahead', 'validate');

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
    var geocoder = new google.maps.Geocoder();
    $('.typeahead').typeahead(null, {
      displayKey: 'description',
      source: Navigate.getSuggestions
    });
    var _this = this;
    $('.typeahead').on('typeahead:selected', function(){
      // reset error state!
      var err = {};
      err[this.id + '_error'] = false;
      _this.setState(err);
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
                <input id="origin" type="text"className={inputClasses} required/>
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
                <input id="origin" type="text" className={inputClasses} required/>
                <label className="active" htmlFor="origin">starting here</label>
              </div>,
              <label className='error_label' htmlFor="origin" data-error="message here" data-success="right">
                {this.state.origin_error}
              </label>,              
              <div className="input-field">
                <input id="destination" type="text" className={inputClasses} required/>
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
                            
                            // proceed to the next page ONLY after
                            // processing the input field args
                            

                          } else {
                            Analytics.locationError(_id);
                            var err = {};
                            err['origin_error'] = "we're only able to map greenlanes in toronto. please try again";
                            _this.setState(err)
                            // alert('No results found for ' + _id);
                          }
                        }
                        else{
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
        new google.maps.LatLng(43.574896,-79.601904),
        new google.maps.LatLng(43.856788, -79.167944)
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
                      new google.maps.LatLng(43.574896,-79.601904),
                      new google.maps.LatLng(43.856788, -79.167944)
            )}, function(results, status){
                        if (status == google.maps.GeocoderStatus.OK) {
                          // Grab the most likely candidate for the reverse geocode lookup.
                          if (results[0]){
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
                            Analytics.locationError(_id);
                            var err = {};
                            err[_id + '_error'] = "we're only able to map greenlanes in toronto. please try again";
                            _this.setState(err)
                            // alert('No results found for ' + _id);
                          }
                        }
                        else{
                            var err = {};
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
          <button id='submitRoute' onClick={this.validate} className="btn-secondary col s9 offset-s1.5">continue
          </button>          
        </div>
    );
  }
});

module.exports = Endpoints;