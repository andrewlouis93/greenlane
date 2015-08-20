var React = require('react/addons');
var Classnames = require('classnames');
var MapView = require('./Map.jsx');
var Navigate = require('../stores/Navigate.jsx');
var Actions = require('../stores/Actions.jsx');
var ScenicStore = require('../stores/Stores.jsx');
var ParkInfo = require('./ParkInfo.jsx');


function readCookie(name) {
    var value = (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
    // console.log('cookie value', value);
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
          url: null,
          parkViewBtnState: Classnames(ScenicStore.getParkViewBtnState())
        };
        return listItem;
  },
  componentDidMount: function(){
    // console.log("Route View has Mounted!");
    ScenicStore.addChangeListener(this._onChange);
    // console.log(ScenicStore.getSessionState().activePath);
    $(document).on('click', '.favorite', this.favouriteRoute);
    $(document).on('click','.favorited', this.unfavouriteRoute);
  },
  componentWillUnmount: function(){
    ScenicStore.removeChangeListener(this._onChange);
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
    // console.log(pkg);
   $.ajax
    ({
        type: "POST",
        url: 'https://greenlane.io/auth/save-route',
        dataType: 'json',
        //json object to sent to the authentication url
        data: pkg,
        success: function (res) {

          // Grab index right here mate!
          $(".favorite-alert").text('favourited').removeClass('unfav').addClass('fav').fadeIn('slow').fadeOut(1200);

          Actions.changeParkViewBtn('favorited', res.index);
        }
    })
  },
  unfavouriteRoute: function(){
    var pkg = {
      routeId: ScenicStore.getFavouritedIndex(),
      authId: parseFloat(readCookie('authId')),
      type: readCookie('type')
    };
    // Route to delete the last element.
    $.ajax
     ({
         type: "POST",
         url: 'https://greenlane.io/auth/delete-route',
         dataType: 'json',
         //json object to sent to the authentication url
         data: pkg,
         success: function () {
           $(".favorite-alert").text('unfavourited').removeClass('fav').addClass('unfav').fadeIn('slow').fadeOut(1200);
          Actions.changeParkViewBtn('favorite');
         }
     })
  },
  googleMapsURL: function(){
    //https://www.google.com/maps/dir/lat,lng/...
    var url = "https://www.google.com/maps/dir/";

    if (ScenicStore.getSessionState().origin && ScenicStore.getSessionState().activePath){

      url += ScenicStore.getSessionState().origin.latLng.lat+","+ScenicStore.getSessionState().origin.latLng.lng;
      ScenicStore.getSessionState().activePath.info.scenic_route.map(function(scenic){
        // 1 -> lat, 0->lng
        url+="/"+scenic[1]+","+scenic[0];
      })

      // check for loop or route.
      if (  (ScenicStore.getSessionState().origin && ScenicStore.getSessionState().origin.latLng && ScenicStore.getSessionState().destination && ScenicStore.getSessionState().destination.latLng)||(ScenicStore.getSessionState().origin && ScenicStore.getSessionState().origin.latLng)  ){
        if (ScenicStore.getSessionState().loop && ScenicStore.getSessionState().origin && ScenicStore.getSessionState().origin.latLng){
          url+="/" + ScenicStore.getSessionState().origin.latLng.lat+","+ScenicStore.getSessionState().origin.latLng.lng;
        }
        else if (ScenicStore.getSessionState().destination && ScenicStore.getSessionState().destination.latLng){
          url+="/" + ScenicStore.getSessionState().destination.latLng.lat+","+ScenicStore.getSessionState().destination.latLng.lng;
        }
      }

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

    var distanceToPrevious = 0;
    var distanceToSubsequent = 0;

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
                    var wayPark = "greenpoint";
                    var uTurn = "u-turn";
                    var yourLoc = "arrive";
                    var head = "Head";
                    var rExp = new RegExp('\\b' + rightTurn + '\\b');
                    var lExp = new RegExp('\\b' + leftTurn + '\\b');
                    var sExp = new RegExp('\\b' + straight + '\\b');
                    var pExp = new RegExp('\\b' + wayPark + '\\b');
                    var dExp = new RegExp('\\b' + yourLoc + '\\b');
                    var uExp = new RegExp('\\b' + uTurn + '\\b');
                    var hExp = new RegExp('\\b' + head + '\\b');

                    var _addedDistance = null;

                    distanceToPrevious = distanceToSubsequent;

                    if (current == row.maneuver.instruction){
                      distanceToSubsequent += row.distance;
                      return;
                    }
                    else {
                      current = row.maneuver.instruction;
                      distanceToSubsequent = row.distance;

                      if ((row.way_name == "")&&(distanceToPrevious)){
                        _addedDistance = distanceToPrevious;
                      }

                    }

                    // Check for wayname here...
                    if (rExp.test(row.maneuver.instruction)){
                      var printInstruction = ( _addedDistance ) ? ( row.maneuver.instruction + " in <b>" + distanceToPrevious + "m</b>" ) : ( row.maneuver.instruction );
                      return (
                        <div className="ui-menu-item"><li className="rightTurn"></li>
                        <li dangerouslySetInnerHTML={{__html:printInstruction}}  className="menuitem">
                        </li></div>
                      )
                    } else if (lExp.test(row.maneuver.instruction)){
                      var printInstruction = ( _addedDistance ) ? ( row.maneuver.instruction + " in <b>" + distanceToPrevious + "m</b>" ) : ( row.maneuver.instruction );
                      return(
                        <div className="ui-menu-item"><li className="leftTurn"></li>
                        <li dangerouslySetInnerHTML={{__html:printInstruction}}  className="menuitem">
                        </li></div>
                      )
                    } else if (sExp.test(row.maneuver.type)){
                      var printInstruction = ( _addedDistance ) ? ( row.maneuver.instruction + " for <b>" + distanceToPrevious + "m</b>" ) : ( row.maneuver.instruction );
                      return(
                        <div className="ui-menu-item"><li className="straight"></li>
                        <li dangerouslySetInnerHTML={{__html:printInstruction}}  className="menuitem">
                        </li></div>
                      )
                    } else if (pExp.test(row.maneuver.instruction)){
                      var printInstruction = ( _addedDistance ) ? ( row.maneuver.instruction + " in <b>" + distanceToPrevious + "m</b>" ) : ( row.maneuver.instruction );
                      return(
                        <div className="ui-menu-item"><li className="parkIcon"></li>
                        <li dangerouslySetInnerHTML={{__html:printInstruction}}  className="menuitem">
                        </li></div>
                      )
                    } else if (dExp.test(row.maneuver.type)){
                      var printInstruction = ( _addedDistance ) ? ( row.maneuver.instruction + " in <b>" + distanceToPrevious + "m</b>" ) : ( row.maneuver.instruction );
                      return(
                        <div className="ui-menu-item"><li className="locIcon"></li>
                        <li dangerouslySetInnerHTML={{__html:printInstruction}}  className="menuitem">
                        </li></div>
                      )
                    } else if (uExp.test(row.maneuver.type)){
                      var printInstruction = ( _addedDistance ) ? ( row.maneuver.instruction + " in <b>" + distanceToPrevious + "m</b>" ) : ( row.maneuver.instruction );
                      return(
                        <div className="ui-menu-item"><li className="uTurn"></li>
                        <li dangerouslySetInnerHTML={{__html:printInstruction}}  className="menuitem">
                        </li></div>
                      )
                    } else if (hExp.test(row.maneuver.instruction)){
                      var printInstruction = ( _addedDistance ) ? ( row.maneuver.instruction + " in <b>" + distanceToPrevious + "m</b>" ) : ( row.maneuver.instruction );
                      return(
                        <div className="ui-menu-item"><li className="straight"></li>
                        <li dangerouslySetInnerHTML={{__html:printInstruction}}  className="menuitem">
                        </li></div>
                      )
                    } else {
                      var printInstruction = ( _addedDistance ) ? ( row.maneuver.instruction + " in <b>" + distanceToPrevious + "m</b>" ) : ( row.maneuver.instruction );
                      return (
                        <div className="ui-menu-item">
                        <li dangerouslySetInnerHTML={{__html:printInstruction}} className="menuitem">
                        </li></div>
                      )
                    }
                  }
              )}
              <a href={this.state.url} target="_blank" className="ui-menu-item google-link">
                <div id='gmaps-link' className='btn-secondary'>
                  <i id='gmaps-image' className="fa fa-google left fa-2x"></i>
                  <span>give it a listen</span>
                </div>
              </a>
            </ul>),
    }
    this.setState(updatedStateProp);

  },

    _onChange: function(){
    // console.log("in directions view, the following is the updated directions list.");
    // console.log(ScenicStore.getLayout().directions);

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
    this.setState({parkViewBtnState: Classnames( ScenicStore.getParkViewBtnState() )});
    this.setState({favouriteIndex: ScenicStore.getFavouritedIndex()})
    window._park = this.state.parkViewBtnState;

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
                <li className="destLbl activator">
                  <span className="activator">{null ? this.state.travelDest : this.state.travelOrig}</span>
                </li>
                <li className="timeLbl activator">
                  <span className="activator">{this.state.travelTime + ' | ' + this.state.travelDist}</span>
                </li>
              </ul>
          </div>
          <div className={this.state.parkViewBtnState}></div>
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
          <div className={this.state.parkViewBtnState}></div>
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
