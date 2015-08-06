var React = require('react/addons');
var Classnames = require('classnames');
var MapView = require('./Map.jsx');
var Navigate = require('../stores/Navigate.jsx');
var Actions = require('../stores/Actions.jsx');
var ScenicStore = require('../stores/Stores.jsx');
var ParkInfo = require('./ParkInfo.jsx');


function readCookie(name) {
    var value = (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
    console.log('cookie value', value);
    return (value == null) ? false : decodeURIComponent(value);
}


var RouteView = React.createClass({
  getInitialState: function(){
    var listItem = {
          list: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.steps : [],
          travelTime: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.formatted.duration : null,
          travelDist: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.formatted.distance : null,
          travelDest: null,
          travelOrig: null,
          turns: null,
          directionsState: Classnames('card','col','l3','m12','s12',ScenicStore.getLayout().directions),
          url: null
        };
        return listItem;
  },
  componentDidMount: function(){
    console.log("Route View has Mounted!");
    ScenicStore.addChangeListener(this._onChange);
    console.log(ScenicStore.getSessionState().activePath);
    window.nateState = this.state;
  },
  // takes in an array of mapbox latLng objects and
  // converts to regular objects.
  serializeLatLng: function(point){
      return {lat: point.latLng.lat, lng: point.latLng.lng};
  },
  favouriteRoute: function(){
    if (readCookie('authenticated') == false){
      Actions.activateError('auth');
      return;
    }

    var pkg = {
      authId: parseFloat(readCookie('authId')),
      type: readCookie('type'),
      route: {
        loop: ScenicStore.getSessionState().loop,
        originName: ScenicStore.getSessionState().originName,
        origin: this.serializeLatLng(ScenicStore.getSessionState().origin),
        destinationName: ScenicStore.getSessionState().destinationName,
        destination: (ScenicStore.getSessionState().loop) ? false : this.serializeLatLng(ScenicStore.getSessionState().destination),
        formatted: ScenicStore.getSessionState().activePath.formatted,
        transit: ScenicStore.getSessionState().activePath.transit,
        info: ScenicStore.getSessionState().activePath.info
      }
    };
    console.log(pkg);
   $.ajax
    ({
        type: "POST",
        url: 'http://localhost:3000/save-route',
        dataType: 'json',
        //json object to sent to the authentication url
        data: pkg,
        success: function () {
          $('.favorite').addClass('favorited').removeClass('favorite');
        }
    })
  },
  googleMapsURL: function(){
    //https://www.google.com/maps/dir/lat,lng/...
    var url = "https://www.google.com/maps/dir/";

    if (ScenicStore.getSessionState().origin && ScenicStore.getSessionState().destination && ScenicStore.getSessionState().activePath){
      url += ScenicStore.getSessionState().origin.latLng.lat+","+ScenicStore.getSessionState().origin.latLng.lng;
      ScenicStore.getSessionState().activePath.info.scenic_route.map(function(scenic){
        // 1 -> lat, 0->lng
        url+="/"+scenic[1]+","+scenic[0];
      })
      url+="/" + ScenicStore.getSessionState().destination.latLng.lat+","+ScenicStore.getSessionState().destination.latLng.lng;

      if (ScenicStore.getSessionState().transit == "cycling")
        url+="/data=!4m2!4m1!3e1";
      else if (ScenicStore.getSessionState().transit == "walking")
        url+="/data=!4m2!4m1!3e2";
    }
    return url;
  },
  createList: function(){
    var Directions = this.state.list;
    var current = null;
    var updatedStateProp = {
      turns: (<ul tabIndex="-1">
                <div className="ui-menu-item startLocation">
                  <li className="locIcon"></li>
                  <li className="menuitem">{this.state.travelOrig}</li>
                </div>
                  {Directions.map(function(row, i){
                    var rightTurn = "right";
                    var leftTurn = "left";
                    var straight = "continue";
                    var wayPark = "waypoint";
                    var uTurn = "u-turn";
                    var yourLoc = "arrive";
                    var rExp = new RegExp('\\b' + rightTurn + '\\b');
                    var lExp = new RegExp('\\b' + leftTurn + '\\b');
                    var sExp = new RegExp('\\b' + straight + '\\b');
                    var pExp = new RegExp('\\b' + wayPark + '\\b');
                    var dExp = new RegExp('\\b' + yourLoc + '\\b');
                    var uExp = new RegExp('\\b' + uTurn + '\\b');

                    if (current == row.maneuver.instruction){
                      return;
                    }
                    else {
                      current = row.maneuver.instruction;
                    }

                    if (rExp.test(row.maneuver.instruction)){
                      return (
                        <div className="ui-menu-item"><li className="rightTurn"></li>
                        <li dangerouslySetInnerHTML={{__html:row.maneuver.instruction}}  className="menuitem">
                        </li></div>
                      )
                    } else if (lExp.test(row.maneuver.instruction)){
                      return(
                        <div className="ui-menu-item"><li className="leftTurn"></li>
                        <li dangerouslySetInnerHTML={{__html:row.maneuver.instruction}}  className="menuitem">
                        </li></div>
                      )
                    } else if (sExp.test(row.maneuver.type)){
                      return(
                        <div className="ui-menu-item"><li className="straight"></li>
                        <li dangerouslySetInnerHTML={{__html:row.maneuver.instruction}}  className="menuitem">
                        </li></div>
                      )
                    } else if (pExp.test(row.maneuver.instruction)){
                      return(
                        <div className="ui-menu-item"><li className="parkIcon"></li>
                        <li dangerouslySetInnerHTML={{__html:row.maneuver.instruction}}  className="menuitem">
                        </li></div>
                      )
                    } else if (dExp.test(row.maneuver.type)){
                      return(
                        <div className="ui-menu-item"><li className="locIcon"></li>
                        <li dangerouslySetInnerHTML={{__html:row.maneuver.instruction}}  className="menuitem">
                        </li></div>
                      )
                    } else if (uExp.test(row.maneuver.type)){
                      return(
                        <div className="ui-menu-item"><li className="uTurn"></li>
                        <li dangerouslySetInnerHTML={{__html:row.maneuver.instruction}}  className="menuitem">
                        </li></div>
                      )
                    } else {
                      return (
                        <div className="ui-menu-item">
                        <li dangerouslySetInnerHTML={{__html:row.maneuver.instruction}} className="menuitem">
                        </li></div>
                      )
                    }
                  }
              )}
              <a href={this.state.url} target="_blank" className="ui-menu-item hide-on-large-only">
                <div id='gmaps-link' className='btn-secondary'>
                  <i id='gmaps-image' className="fa fa-google left fa-2x"></i>
                  <span>listen to your route</span>
                </div>
              </a>
            </ul>),
    }
    this.setState(updatedStateProp);

  },

    _onChange: function(){
    console.log("in directions view, the following is the updated directions list.");
    console.log(ScenicStore.getLayout().directions);

    var oldList = this.state.list;

    this.setState({
                     list: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.steps : [],
                     travelTime: (ScenicStore.getSessionState().activePath ) ? ScenicStore.getSessionState().activePath.formatted.duration : null,
                     travelDist: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.formatted.distance : null,
                     travelDest: ScenicStore.getSessionState().destinationName,
                     travelOrig: ScenicStore.getSessionState().originName,
                     directionsState: Classnames('card','col','l3','m12','s12',ScenicStore.getLayout().directions)
                  });

    if (this.state.list != oldList)
      this.createList();

    window._hrrr = this.state.list;

    this.setState({url: this.googleMapsURL()});
  },
  render: function() {
    return (

    <div id="directionsContainer" className={this.state.directionsState}>
      <ParkInfo/>
      <div className="card-image">
      </div>
        <div className="HeaderRoute card-content">
          <div className="routeChoice"></div>
          <div id="routeInfo">
              <ul onClick={this.createList}>
                <li className="destLbl">
                  <span className="activator">{null ? this.state.travelDest : this.state.travelOrig}</span>
                </li>
                <li className="timeLbl">
                  <span className="activator">{this.state.travelTime + ' | ' + this.state.travelDist}</span>
                </li>
              </ul>
          </div>
          <div className="go-to-route"></div>
          <div onClick={this.favouriteRoute} className="favorite hide"></div>
        </div>

        <div id="turnList" className='card-reveal'>
          <div id="listTop">
          <div className="routeChoice"></div>
          <div id="routeInfo">
              <ul>
                <li className="destLbl">
                  <span className="card-title">{null ? this.state.travelDest : this.state.travelOrig}</span>
                </li>
                <li className="timeLbl">
                  <span className="card-title">{this.state.travelTime + ' | ' + this.state.travelDist}</span>
                </li>
              </ul>
          </div>
          <div className="go-to-route goToRoute"></div>
          <div onClick={this.favouriteRoute} className="favorite hide"></div>
          </div>
          <div className="turnDirect">
          {this.state.turns}
          </div>
        </div>
    </div>
    );
  }
});

module.exports = RouteView;
