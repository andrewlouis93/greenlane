var React = require('react/addons');
var ScenicStore = require('../stores/Stores.jsx');
var Actions = require('../stores/Actions.jsx');
var Navigate = require('../stores/Navigate.jsx');


var inputClassnames = require('classnames');
var inputClasses = inputClassnames('typeahead');

var Endpoints = React.createClass({
  getInitialState: function(){
    console.log("In Endpoints");
    return {
      "origin": {},
      "destination": {},
      "greenpoints": []
    };
  },
  componentDidMount: function(){
    var geocoder = new google.maps.Geocoder();
    $('.typeahead').typeahead(null, {
      displayKey: 'description',
      source: Navigate.getSuggestions
    });
    $('.typeahead').on('typeahead:selected', function(evt, obj){
      console.log("capturing event");
      var _stateChange = {};
      geocoder.geocode({'placeId': obj.place_id}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            // Grab the most likely candidate for the reverse geocode lookup.
            if (results[0]){
              // Modify the state value to represent the updated values.
              // x.geometry.location returns a google.map.LatLng object
              Actions.setSessionState(evt.target.id, {
                "latLng": L.latLng(results[0].geometry.location.lat(),results[0].geometry.location.lng())
              });
            } else {
              console.log('No results found');
            }
          } else {
            console.log('Geocoder failed due to: ' + status);
          }
        }.bind(this));
    }.bind(this));
  }, 
  handleSubmit: function(e){

    // return false;
  },
  // Looks at the store state and decides whether
  // to show one or two inputs.
  routeInputs: function(){
      console.log("Returning Route Inputs");
      if (this.props.loop){
        // Show looping inputs!
        console.log("I'M LOOPING");
        return [
              <div className="input-field">
                <input id="origin" type="text" placeholder="Looping From" className={inputClasses} />
              </div>
        ];
      }
      else{
        // Show routing inputs
        console.log("I'M ROUTING!");
        return [
              <div className="input-field">
                <div className="yourLoc"></div>
                <input id="origin" type="text" placeholder="Home" className={inputClasses} />

                <label className="active" htmlFor="origin">Im starting here</label>

              </div>,
              <div className="input-field">
                <input id="destination" type="text" placeholder="Critical Mass" className={inputClasses} />
                <label className="active" htmlFor="origin">Im going there</label>

              </div>
        ];        
      }
  },
  validate: function(){
    // Ensure the inputs are filled in!
    console.log("Ensure the inputs are filled in!");
    addLoc();

  },
  render: function() {
    return (
        <div>
          <div className="distContainer row">
            {
              this.routeInputs().map(function(reactComponent){
                return reactComponent;
              })
            }
          </div>
          <button id='submitRoute' onClick={this.validate} className="btn-primary waves-effect waves-light col s8 offset-s2">continue
          </button>          
        </div>
    );
  }
});

module.exports = Endpoints;