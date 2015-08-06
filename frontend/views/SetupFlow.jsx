var React = require('react/addons');
var Classnames = require('classnames');
var Endpoints = require('./EndpointsView.jsx');
var TimeDrag = require('./DragInt.jsx')

var ScenicStore = require('../stores/Stores.jsx');
var Actions = require('../stores/Actions.jsx');

var SetupFlow = React.createClass({
  getInitialState: function(){    
    var _seed = this.routes().transBtns;
    var _initState = {};
    
    _initState['reactBlob'] = _seed.reactBlob;
    _initState['linkTo'] = _seed.linkTo;
    _initState['sessionState'] = ScenicStore.getSessionState();
    _initState['layout'] = Classnames('row','routeSel','left','col', this.props.layout);
    _initState['lockHeight'] = {};

    return _initState;
  },
  componentDidMount: function(){
    ScenicStore.addChangeListener(this.updateState);
    this.setState({
      lockHeight: {
        minHeight: window.innerHeight 
      }
    });
  },
  updateState: function(){
    this.state.sessionState = ScenicStore.getSessionState();
    this.state.layout = Classnames('row','routeSel','left','col', ScenicStore.getLayout().nav);
  },
  routes: function(){
     return {
        transBtns:{
          reactBlob:
          (
            <div className="optSwitch">
              <p className="introTag">i have</p>
              <a className="bikeGroup">
                <div onClick={addBike.bind(this, Actions)} className="svg svg-bike-switch"></div>
                <div className="cloudOneBike"></div>
                <div className="cloudTwoBike"></div>
              </a>
              <a className="walkGroup">
                <div onClick={addWalk.bind(this, Actions)} className="svg svg-walk-switch"></div>
                <div className="cloudOneWalk"></div>
                <div className="cloudTwoWalk"></div>
              </a>
            </div>
          ),
          linkTo: 'travelType'
        }
        ,
        travelType: {
          reactBlob:(
            <div className="optSwitch">
              <p className="introTag">i have</p>
              <a>
                <div className="locIconStart"></div>
                <div className="locIconEnd"></div>
                <div onClick={addRoute.bind(this, Actions)} className="svg routeBtn"></div>
              </a>
              <a>
                <div className="locIconLoop"></div>
                <div onClick={addLoop.bind(this, Actions)} className="svg loopBtn"></div>
              </a>
            </div>
          ),
          linkTo: 'destSel'
        }
        ,
        destSel: {
          reactBlob: (<Endpoints loop={this.state && this.state.sessionState.loop} isLoading={this.props.isLoading}/>),
          linkTo: 'timeSel'
        }
        ,
        timeSel: {
          reactBlob:(
            (<TimeDrag/>)
          ),
          linkTo: 'transBtns'
        }
      }
    }
  , 
  nextState: function(){
    // Gets the linkTo value
    var nextView = this.state.linkTo;
    // Sets the state object identified by the above property.
    this.setState(this.routes()[nextView]);
    $(".progress-point.active").next().trigger('click');
  },

  transBtns: function() {
    this.setState(this.routes().transBtns);

  },
    travelType: function() {
    this.setState(this.routes().travelType);
  },

  destSel: function() {
    this.setState(this.routes().destSel);
  },

  timeSel: function() {
    this.setState(this.routes().timeSel);
  },

  render: function() {
    return (
        <div className={this.state.layout}>
          <div className="heightFix col s2">
            <div style={this.state.lockHeight} className="progress-meter">
              <div className="track">
                <span className="progress"></span>
              </div>
              <ol className="progress-points" data-current="1">
                <li id="transBtns" className="progress-point active Back_Progress_Trans" onClick={this.transBtns} href="#step-1">
                </li>
                <li id="travelType" className="progress-point disabled Back_Progress_Travel" onClick={this.travelType} href="#step-2">
                </li>
               <li id="destSel" className="progress-point disabled Back_Progress_Dest" onClick={this.destSel} href="#step-3">
                </li>
                <li id="timeSel" className="progress-point disabled" onClick={this.timeSel} href="#step-4">
                </li>
              </ol>
              <span className="current">
                <svg version="1.1" className="p-svg-pulse" xmlns="http://www.w3.org/2000/svg" x="50px" y="50px">
                  <circle className="pulse" fill="none" stroke="rgba(56,208,149,0.2)" stroke-miterlimit="10" cx="26" cy="18" r="5"/>
                  <circle className="pulseTwo" fill="none" stroke="rgba(56,208,149,0.5)" stroke-miterlimit="10" cx="26" cy="18" r="5"/>
                  <circle className="center" fill="rgb(88,189,152)" cx="26" cy="18" r="8"/>
                </svg>
              </span>
            </div>
          </div>
          <div className="heightFix col s9">
            {this.state.reactBlob}
          </div>
        </div>
    );
  }
});

module.exports = SetupFlow;