var React = require('react/addons');

var config = require('../config.js');

var ScenicStore = require('../stores/Stores.jsx');
var Actions = require('../stores/Actions.jsx');

var Error = React.createClass({
	getInitialState: function(){
		return {
			err_css: ScenicStore.getErrObj().css,
			title: false,
			body: false
		}
	},
	componentDidMount: function(){
		// Seed with default state.
		// this.setState(this['auth']());
		ScenicStore.addErrorListener(this._errorUpdate);
		// this.setState(this['geolocate']());
	},
	render: function(){
		return (
			<div id='error' className={this.state.err_css}>
				<div id='error_container'>
					<div id='error_content'>
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
		this.setState(this[ScenicStore.getErrObj().state]())
	}
})

module.exports = Error;
