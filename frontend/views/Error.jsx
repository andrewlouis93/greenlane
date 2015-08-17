var React = require('react/addons');

var config = require('../config.js');

var Classnames = require('classnames');
var ScenicStore = require('../stores/Stores.jsx');
var Actions = require('../stores/Actions.jsx');

var Error = React.createClass({
	getInitialState: function(){
		return {
			err_css: ScenicStore.getErrObj().css,
			title: false,
			body: false,
			hasLogo: Classnames()
		}
	},
	facebookShare: function(){
		  FB.ui({
        method: 'share',
        href: 'https://greenlane.io',
    }, function(response){
			console.log('facebookShare Response', response);
		});
	},
	componentDidMount: function(){
		// Seed with default state.
		// this.setState(this['auth']());
		ScenicStore.addErrorListener(this._errorUpdate);
		// Orientation Lock!

		if (window.orientation && (window.orientation!==0)){
			Actions.activateError('landscape');
			this.setState({hasLogo: Classnames('contains_logo')})
		}
		window.addEventListener("orientationchange", function() {
			if (window.orientation === 0){
				this.setState({hasLogo: Classnames()})
				this.deactivate();
			}
			else{
				Actions.activateError('landscape');
				this.setState({hasLogo: Classnames('contains_logo')})
			}
		}.bind(this), false);
		// this.setState(this['geolocate']());
	},

	render: function(){
		return (
			<div id='error' className={this.state.err_css}>
				<div id='error_container' className={this.state.hasLogo}>
					<div id='error_content' className="animation-error">
						<div id='error_title'>{this.state.title}</div>
						{this.state.body}
					</div>
				</div>
			</div>
			)
	},
	// different err states below
	auth: function(){
		return{
			title: 'to favourite your route please sign in',
			body: (
			[
				<div className='sub-text'>
					signing in you will restart your greenlane
				</div>,
				<a onClick={this.deactivate} href={`${config.api_url}/auth/facebook`} className='btn-facebook error-btn'>
              		<i className="fa fa-facebook left fa-2x"></i>
              		<span>sign in with facebook</span>
              	</a>
				,
				<a onClick={this.deactivate} href={`${config.api_url}/auth/google`} className='btn-google error-btn'>
              		<i className="fa fa-google left fa-2x"></i>
              		<span>sign in with google</span>
              	</a>,
					<div className="choice-container">
						<div className='line-container line-1'></div>
						<div className='centered-or'>or</div>
						<div className="line-container line-2"></div>
					</div>
				,
				<div onClick={this.deactivate} className='btn-primary err-cancel error-btn'>
					cancel
				</div>
			]
		)}
	},
	share: function(){
		return{
			title: 'share Greenlane with your friends!',
			body: (
			[
				<a onClick={this.facebookShare} className='btn-facebook error-btn fb-share-button'>
        		<i className="fa fa-facebook left fa-2x"></i>
        		<span className="smaller-social">share on facebook</span>
        </a>
				,
				<a target="_blank" className='btn-twitter error-btn' href="https://twitter.com/intent/tweet?related=greenlaneTO&text=What%27s%20good%20Greenlane&hashtags=greenlane,toronto">
        		<i className="fa fa-twitter left fa-2x"></i>
        		<span className="smaller-social">share on twitter</span>
        </a>
				,
				<div onClick={this.deactivate} className='btn-primary err-cancel error-btn smaller-cancel'>
					cancel
				</div>
			]
		)}
	},
	nogeolocation: function(){
		return{
			title: "your browser doesn't support geolocation",
			body: (
			[
				<div onClick={this.deactivate} className='btn-primary err-cancel error-btn'>
					cancel
				</div>
			]
		)}
	},
	location: function(){
		return{
			title: 'trying to find you...',
			body: (
			[
				<div onClick={this.deactivate} className='btn-primary err-cancel error-btn'>
					cancel
				</div>
			]
		)}
	},
	landscape: function(){
		this.setState({hasLogo: 'contains_logo'})
		return{
			title: null,
			body: (
			[
				<div className="logoWhite"></div>,
				<p className="loaderText flow-text">landscapes are best seen in portrait mode</p>
			]
		)}
	},
	geolocate: function(){
		return{
			title: "you're about to use Google Maps to navigate to your greenlane",
			body: (
			[
				<div onClick={this.deactivate} className='btn-primary error-btn error_inline_btns'>
					cancel
				</div>,
				<div className='btn-secondary error-btn error_inline_btns'>
					continue
				</div>
			]
		)}
	},
	deactivate: function(){
		Actions.deactivateError();
	},
	_errorUpdate: function(){
		// update state to grab that fresh css from ScenicStore.
		var errState = ScenicStore.getErrObj();
		this.setState({
			err_css: errState.css,
		});

		if (ScenicStore.getErrObj() && ScenicStore.getErrObj().state)
			this.setState(this[ScenicStore.getErrObj().state]())
	},
	componentWillUnmount: function(){
		ScenicStore.removeChangeListener(this._errorUpdate);
	}
})

module.exports = Error;
