var React = require('react/addons');
var Actions = require('../stores/Actions.jsx');
var Analytics = require('../stores/Analytics.jsx');
var ScenicStore = require('../stores/Stores.jsx');
var Classnames = require('classnames');
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;


//  function toggleFullScreen(){
//  	if ($(window).width() <= 800 && isSafari == false) {
// 		var doc = window.document;
// 		var docEl = doc.documentElement;
// 		var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
// 		var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

// 		if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
// 			requestFullScreen.call(docEl);
// 		} else {
// 			cancelFullScreen.call(doc);
// 		}
// 	}
// };

var Map = React.createClass({

	getInitialState: function(){
		return{
			layout: Classnames('col', this.props.layout),
			logoStyle: Classnames('logoBeta', ScenicStore.getLayout().logoState),
			startButtonStyle: Classnames(
									'col s4 m2 l2 map-start-btn btn-secondary',
									'Begin_Setup',
									ScenicStore.getLayout().logoState
							)
		};
	},
	componentWillMount: function(){
		this.updateDimensions();
		ScenicStore.addChangeListener(this.updateState);
	},
	componentDidMount: function(){
	    L.mapbox.accessToken = 'pk.eyJ1IjoiYWxvdWlzIiwiYSI6ImUwZWUwYmIzNThmZjAxYWI2YTIwNGNmYmQxZjUzNWU1In0.9QfqI_cVh9_6w1kBSA-yaQ';
	    window.map = L.mapbox.map('map', 'alouis.n127p3ip',{closePopupOnClick: false})
	      			.setView([43.64, -79.39], 15);
	    window.addEventListener("resize", this.updateDimensions);

	    // Parent mounts only after all children elements mount!
	    // console.log("CHANGING PARENT STATE...", this.props.parentState);
	},
	// Invoked to keep the map consistent on screen
	updateDimensions: function(){
		if (window && window.map){
			window.map.invalidateSize();
			// console.log("Map Invalidated");
		}

		// close side-menu,
		if ($("#sidenav-overlay").length == 0)
			$("#slide-out").css({
				right: -1*$("#slide-out").width()
			});
		else{
			;
		}
	},
	updateState: function(){
		this.state.layout = Classnames('col','leaflet-container','leaflet-fade-anim', ScenicStore.getLayout().map);

		/* Hide the logo and the start button upon activating menu. */
		this.state.logoStyle = Classnames('logo', ScenicStore.getLayout().logoState);
		this.state.startButtonStyle = Classnames(
										'col s4 m4 l2 map-start-btn btn-secondary',
										'Begin_Setup',
										ScenicStore.getLayout().logoState
									);
	},
	componentDidUpdate: function(){
		this.updateDimensions();
	},
	routeNav: function(evt) {
		window.scrollTo(0,1);
		Actions.updateMenu('toggle');
		$(".progress-point").first().addClass('active');
		// Resize the map following state changes.
		this.updateDimensions();

		evt.stopPropagation();
		evt.preventDefault();

    /* Send Analytics Tag */
    Analytics.virtualPage('Setup|Transport','/setup/transport');

		return false;
    },
    componentWillUnmount: function(){
  		window.removeEventListener("resize", this.updateDimensions);
      ScenicStore.removeChangeListener(this.updateState);
    },
	render: function(){
		return (
			<div id="map" className={this.state.layout}>
				<div className='favorite-alert fav'>favorited</div>
				<div id="map-container">
					<div className={this.state.logoStyle}></div>
					<a onClick={this.routeNav} className={this.state.startButtonStyle} autoFocus>
						begin
					</a>
				</div>
			</div>);
	}
});
module.exports = Map;
