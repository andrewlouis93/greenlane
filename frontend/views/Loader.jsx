var React = require('react/addons');
var ScenicStore = require('../stores/Stores.jsx');
var Actions = require('../stores/Actions.jsx');

var Loader = React.createClass({
	getInitialState: function(){
		return {
			quotesId: Math.round(Math.random()*(this.loadText().length-1)),
			css: "hide",
			timedOut: false
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
		console.log("THIS STATE", this.state.timedOut);
		this.setState({timedOut: ScenicStore.getSessionState().timedOut});
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
	resetTimeout: function(){
		Actions.resetTimeout();
		Actions.isLoading(false);
		$("#destSel").trigger('click');
	},
	render: function(){
		return (
			<div id="green_loader" className={this.state.css}>
				<div className="loading_content s4 m4 l4">
					<div className="logoWhite"></div>
						{(this.state.timedOut) ?
								<div className="load-wrapp">
									<p className='first-timeout flow-text'>oops! a tree fell in the forest and no one heard</p>
									<p className='second-timeout flow-text'>please map your journey again</p>
									<a id='timeoutReset' className='btn-primary Loading_Refresh' onClick={this.resetTimeout}>try again</a>
								</div>
								:
								[<div className="load-wrapp">
								    <div className="load-3">
						                <div className="line"></div>
						                <div className="line"></div>
						                <div className="line"></div>
				        			</div>
		            </div>,
								<p className="loaderText flow-text">{this.loadText()[this.state.quotesId]}</p>]
						}
					</div>
			</div>
		);
	},
	componentWillUnmount: function(){
		ScenicStore.removeChangeListener(this.updateLoader)
	}
});
module.exports = Loader;
