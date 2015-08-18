var React = require('react/addons');
var Carousel = require('nuka-carousel');
var ScenicStore = require('../stores/Stores.jsx');
var Actions = require('../stores/Actions.jsx');
var Analytics = require('../stores/Analytics.jsx');
var ReactAsync = require('react-async');

var Instagram = React.createClass({
  mixins: [ReactAsync.Mixin],
  getInitialStateAsync(cb) {
    var _url = 'https://api.instagram.com/publicapi/oembed/?' + this.props.url;
    xhr(_url, function(data) {
      console.log(data);
      cb(null, data)
    }.bind(this))
  },
  render() {
    return this.state.data;
   }
})

var Decorators = [{
  component: React.createClass({
    render() {
      return (
        <div
          className="carouselNav"
          onClick={this.props.previousSlide}>
        </div>
      )
    }
  }),
  position: 'CenterLeft',
  style: {
    WebkitTransform: 'rotate(90deg)',
    msTransform: 'rotate(90deg)',
    transform: 'rotate(90deg)'
  }
},
{
  component: React.createClass({
    render() {
      return (
        <div
          className="carouselNav"
          onClick={this.props.nextSlide}>
        </div>
      )
    }
  }),
  position: 'CenterRight',
  style: {
    WebkitTransform: 'rotate(-90deg)',
    msTransform: 'rotate(-90deg)',
    transform: 'rotate(-90deg)'
  }
}];

var ParkCarousel = React.createClass({
  getInitialState: function(){
    console.log("MOUNTING PARK CAROUSEL");
    return {
      parks: ScenicStore.getSessionState().activePath.info.parks
    }
  },
  componentWillMount: function(){
    console.log("in componet will mount");
    console.log(this.state.parks);
    window._carousel = this;
  },
  componentDidMount: function(){
    ScenicStore.addChangeListener(this.updateParkList);
    $(document).on('click','.slider-decorator-0,.slider-decorator-1', this.updateActiveCarousel);
  },
  componentWillUnmount: function(){
    ScenicStore.removeChangeListener(this.updateParkList);
  },
  updateParkList: function(){
      var oldParks = this.state.parks;
      this.setState({parks: ScenicStore.getSessionState().activePath.info.parks});
      // Check that they are both equal!
      var noChange = true;
      console.log('oldParks',oldParks);
      console.log('newParks',this.state.parks);
      for (var i = 0; i < Math.max(oldParks.length,this.state.parks.length); i++){
        if (oldParks[i] != this.state.parks[i])
          noChange = false;
      }

      console.log('noChange',noChange);
      window._pC = this.state.carousels.parkCarousel;
      if (noChange == false){
        this.state.carousels.parkCarousel.goToSlide(0);
        setTimeout(function(){
          Actions.setSessionState('activeCarousel', 0);
        }.bind(this),0);
      }


      // check park list, hide.
      if (this.state.parks.length <= 1)
        $(".slider-decorator-0, .slider-decorator-1").addClass("hide")
      else
        $(".slider-decorator-0, .slider-decorator-1").removeClass("hide")
  },
  updateActiveCarousel: function(){
    setTimeout(function(){
      console.log("IN UPDATE ACTIVE CAROUSEL", this.state.carousels.parkCarousel.state.currentSlide);
      Actions.setSessionState('activeCarousel', this.state.carousels.parkCarousel.state.currentSlide);
    }.bind(this),0);
  },
  mixins: [Carousel.ControllerMixin],
  render() {
    return (
        <Carousel ref='parkCarousel'
                  className="parkMenu"
                  decorators={Decorators}
                  data={this.setCarouselData.bind(this, 'parkCarousel')}>
          {
            this.state.parks.map(function(park){
                return <h3>{park}</h3>
            })
          }
        </Carousel>
    )
  }
});


var ParkTab = React.createClass({

  componentDidMount: function(){
        ScenicStore.addChangeListener(this._onChange);
        $(document).on('click','#routeInfo .activator', this.handleDirectionsTab);
        $(document).on('click','#routeInfo .card-title', this.closeDirections);
    },
    closeDirections: function(){
      // Re-activate route options or route chosen.

      // Re-factor to keep this information in
      // a sessionState attribute as opposed to inferring from the DOM
      if ($('.favorite').is(':visible')){
        Analytics.virtualPage('Route Chosen|Map','/chosen/map');
      }
      else{
        Analytics.virtualPage('Route Options|Map','/options/map');
      }


    },
    handleDirectionsTab: function(){
      // Use Observer - Listener so we do not DRY.
      console.log("CLOSING PARK INFO");
      // is directions open at this point?
      $(".google-expando__icon").removeClass("active");
      $(".google-expando__icon").next().removeClass("active");
    },
    handleParkBtn: function(){
      console.log("Closing directions");
      $('#turnList.card-reveal')
        .css({ display: 'block'})
        .velocity("stop", false)
        .velocity(
            {
              translateY: '0%'
            },
            {
              duration: 300,
              queue: false,
              easing: 'easeInOutQuad'
            }
      );
    },

getInitialState: function(){
  var parkList = {
    activeCarousel: 0,
    expandedInfoHeight: null,
    parkName: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info.parks : [],
    parkFac: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info.facilities : [],
    parkPic: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info.pictures : []
  };
  return parkList;
 },
updateExpInfoHeight: function(){
  if ($(window).width() < 1200)
  {
    this.setState({
      'expandedInfoHeight': '100%'
    });
  }
  else{
    this.setState({
      'expandedInfoHeight': $(".HeaderRoute").offset().top - ($(".openInfo").offset().top + $(".openInfo").outerHeight(true))
    });
  }

},
 updateActiveCarousel: function(current){
  console.log("updated active carousel");
  this.setState({'activeCarousel': current});
 },


  createParkList: function() {
  // To make sure it has the most updated states
  this._onChange();
  var ParkState = this.state.parkName;
  console.log("IN CREATE PARK LIST", ParkState);

  var updatedStateProp = {
    parkName: ParkState.map(function(row, i){
                      return (
                        <h3 dangerouslySetInnerHTML={{__html:row.parks}}>
                        </h3>
                      )
                  }
              ),
    }
  this.setState(updatedStateProp);
    },

  _onChange: function(){
    console.log("IN PARK TAB");
    if (ScenicStore.getSessionState().activePath)
      console.log("ACTIVE PATH BELOW", ScenicStore.getSessionState().activePath.info);

    this.setState({
      activeCarousel: ScenicStore.getSessionState().activeCarousel,
      parkName: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info.parks : [],
      parkFac: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info.facilities : [],
      parkPic: (ScenicStore.getSessionState().activePath) ? ScenicStore.getSessionState().activePath.info.pictures : []
    });
    console.log(ScenicStore.getSessionState().activePath);
    window.myParkState = this.state;
  },




  render: function() {

    var currentFacilities = null;
    var legitFac = [];
    if (this.state.parkFac && this.state.parkFac[this.state.activeCarousel]){
      for (var i = 0; i < this.state.parkFac[this.state.activeCarousel].length; i++){
        var current = this.state.parkFac[this.state.activeCarousel][i];
        console.log('current', current);
        if (current != "NULL"){
          legitFac.push(current[0].split('"').join(""));
          legitFac.push(current[1].split('"').join(""));
        }


      }
    }

    window._legitFac = legitFac;

    return (

      <div className="google-expando--wrap">
        <div className="google-expando">
          <div onClick={this.handleParkBtn} className="google-expando__icon parkBtn">
            <span className="visuallyhidden" aria-hidden="true">Expand Card</span>
          </div>

          <div className="google-expando__card" aria-hidden="true">

            {this.state.parkName.length ? <ParkCarousel updateActiveCarousel={this.updateActiveCarousel}/> : <h3 className='noparks'>no parks here</h3>}

            <div className="openInfo"></div>
          </div>
            <div className="expandedInfo" aria-hidden="true">
              {
                (legitFac.length) ?
                <ul>
                  <h4>i'm going to see</h4>
                  {
                    legitFac.map(function(it,id){
                        var liClass = (id % 2 == 0) ? 'roboto-thick' : 'roboto-thick-red';
                        return <li className={liClass}>{it}</li>
                    })
                   }
                </ul> : <div className='zeroFacilitiesPadding'></div>
              }
              <div className="row imgGrid">
                {
                  (this.state.parkPic && this.state.parkPic[this.state.activeCarousel]) ?
                  this.state.parkPic[this.state.activeCarousel].map(function(it){
                    if (it == "NULL"){
                      return <div className="noParkImg"></div>
                    }
                    else{
                      // return <Instagram url='http://instagram.com/p/fA9uwTtkSN/' />
                      // https://api.instagram.com/publicapi/oembed/?url=http://instagram.com/p/fA9uwTtkSN/
                      var divStyle = {
                        backgroundImage: 'url(' + it + ')',
                      };
                      return <div style={divStyle} className="square"></div>
                    }
                  })
                :
                  false
                }
              </div>
            </div>

        </div>
      </div>
    );
  }
});
module.exports = ParkTab;
