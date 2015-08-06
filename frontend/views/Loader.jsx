var React = require('react/addons');
var ScenicStore = require('../stores/Stores.jsx');
var Actions = require('../stores/Actions.jsx');

var Loader = React.createClass({
	getInitialState: function(){
		return {
			quotesId: Math.round(Math.random()*(this.loadText().length-1)),
			css: "hide"
		}
	},
	componentDidMount: function(){
		ScenicStore.addChangeListener(this.updateLoader);
	},
	updateLoader: function(){
		// check for a state update.
		var old_css = this.state.css;
		var _css = {
			css: (ScenicStore.getSessionState().isLoading) ? '' : "hide"
		};

		if (old_css != _css.css){
			var newIndex;
			if ( (this.state.quotesId+1) == this.loadText().length)
				newIndex = 0;
			else
				newIndex = ++this.state.quotesId;
			// update the text.
			this.setState({
				quotesId: newIndex
			})
		}
		this.setState(_css);
	},
	loadText: function() {
		var quotes= new Array();
		quotes.push("mapping your greenlane");
		quotes.push("soaking in the sun");
		quotes.push("turning over a new leaf");
		quotes.push("smelling the roses");
		quotes.push("mingling with mother nature");
		return quotes;
	},
	render: function(){
		return (
			<div id="green_loader" className={this.state.css}>
				<div className="loading_content s4 m4 l4">
					<div className="logoWhite"></div>
						<div className="load-wrapp">
						    <div className="load-3">
				                <div className="line"></div>
				                <div className="line"></div>
				                <div className="line"></div>
		        			</div>
            			</div>
					<p className="loaderText flow-text">{this.loadText()[this.state.quotesId]}</p>
					</div>
			</div>

		);
	}
});
module.exports = Loader;
