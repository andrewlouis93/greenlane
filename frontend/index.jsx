var React = require('react/addons');
var Classnames = require('classnames');
var ProfileNav = require('./views/ProfileNav.jsx');
var config = require('./config.js');
var SetupFlow = require('./views/SetupFlow.jsx');
var RouteView = require('./views/RouteView.jsx');
var ParkInfo = require('./views/ParkInfo.jsx');
var MapView = require('./views/Map.jsx');
var StaticPages = require('./views/StaticPages.jsx');
var LoopComponent = require('./views/LoopComponent.jsx');
var RouteComponent = require('./views/RouteComponent.jsx');
var Loader = require('./views/Loader.jsx');
var ErrorView = require('./views/Error.jsx');
var Tutorial = require('./views/Tutorial.jsx');

var ScenicStore = require('./stores/Stores.jsx');
var Actions = require('./stores/Actions.jsx');

var is_keyboard = false;
var is_landscape = false;
var initial_screen_size = window.innerHeight;
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


$(document).on('focus', 'input[type="text"]', function(){
  var _windowHeight = initial_screen_size;
  $('body').css({'height':_windowHeight + 'px',
                  'background-color':'white'});
  $('.progress-meter').css({'height':_windowHeight + 'px'});
  $('.progress-meter').css({'display':'block'});
});


// $(document).on('blur', 'input[type="text"]', function(){

// });


function readCookie(name) {
    var value = (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
    console.log('cookie value', value);
    return (value == null) ? false : decodeURIComponent(value);
}
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+";";
}


var Body = React.createClass({
	getInitialState: function(){
    window._BODY = this;
		window._Actions = Actions;
		window._Store = ScenicStore;
		return {
			hideLoader: ScenicStore.getSessionState().isLoading,
			layout: ScenicStore.getLayout(),
			test: ScenicStore.getData(),
			backBtn: Classnames(ScenicStore.getBackBtnState().css),
			lockHeight: {},
			onboardedUser: null
		};
	},
	componentWillMount: function(){
    ScenicStore.addChangeListener(this._onChange);
		var onboardedUser = $.parseJSON(readCookie('onboardedUser'));
		if (onboardedUser) // change to onboardedUser
			this.setState({onboardedUser: true});
		else
			this.setState({bodyContent: false});
	},
  landingAnimation: function(){
    var small = '78%';
    var tablet = '75%';
    var large = '100%';
    var yPos;

    var wWidth = $(window).width();
    if (wWidth <= 600)
      yPos = small;
    else if (wWidth < 992)
      yPos = tablet;
    else
      yPos = large;

    setTimeout(function(){
      $('.landing-animation').animate({
             'background-position-y': yPos
      }, 3000, function(){
        $(this).fadeOut();
      });
    },1000);
  },
	componentDidMount: function(){
		// only occurs once once the rest of the site has loaded!
		createCookie('onboardedUser', true, 365);
		$("#containerRow").css({
			'z-index': -1
		})
    this.landingAnimation();
	},

	changeData: function(){
	    Actions.test();
	},
	startApplication: function(){
		this.setState({onboardedUser: true});
	},
  render: function(){
    var tutClasses = Classnames(
      'landing-tutorial',
      'viewContainer',
      'tutorial',
      (this.state.onboardedUser)?'hide': ''
    )
    return (

			<div id='containerRow' style={this.state.lockHeight} className="row">
        <div className={tutClasses}>
                <div className="landing-animation"></div>
                <Tutorial startApplication={this.startApplication} />
                <div onClick={this.startApplication} id='skip-tutorial'>skip</div>
        </div>
        <div id='backBtn' onClick={Actions.goBack} className={this.state.backBtn}></div>
          <ProfileNav />
          <SetupFlow layout={this.state.layout.nav} parentState={this.state} isLoading={Actions.isLoading} />
          <MapView layout={this.state.layout.map} />
          <Loader />
          <RouteView />
          <StaticPages />
          <ErrorView />
	    </div>
    );
  },
  componentWillUnmount: function(){
  	ScenicStore.removeChangeListener(this._onChange);
  },
  shouldComponentUpdate: function(){
    // Needs to be here!
    this.forceUpdate();
  },
  _onChange: function(){
  	// Set Loader State
  	this.setState({hideLoader: ScenicStore.getSessionState().isLoading});
  	// Set Updated Layouts State
  	this.setState({layout: ScenicStore.getLayout()});
    this.setState({
      // layout prop deails with right padding,
      // backBtnState deals with visibility of the button.
      backBtn: Classnames(
      	ScenicStore.getBackBtnState().css
      )
    }, function(){
      // console.log('backBtn updated!', ScenicStore.getBackBtnState().css)
    })
  }
});

React.render(<Body />, document.getElementById('content'));
