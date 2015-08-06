var React = require('react/addons');
var Classnames = require('classnames');
var Navigate = require('../stores/Navigate.jsx');
var Actions = require('../stores/Actions.jsx');
var ScenicStore = require('../stores/Stores.jsx');
var TutorialSection = require('./Tutorial.jsx');




function readCookie(name) {
    var value = (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
    console.log('cookie value', value);
    return (value == null) ? false : decodeURIComponent(value);
}
// SECTION FOR ACCORDION DROP DOWN MENU /////////////////////////////////////////////////////////

var Section = React.createClass({
  handleClick: function(){
    if(this.state.open) {
      this.setState({
        open: false,
        class: "section"
      });
    }else{
      this.setState({
        open: true,
        class: "section open"
      });
    }
  },
  getInitialState: function(){
     return {
       open: false,
       class: "section"
     }
  },
  render: function() {
    return (
      <div className={this.state.class}>
        <button></button>
        <div className="sectionhead" onClick={this.handleClick}>
        	{this.props.title}
        </div>
        <div className="articlewrap">
          <div className="article">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

var Accordion = React.createClass({
  render: function() {
    return (
      <div className="faqMain">
        <div className="staticTitle">{this.props.title}</div>
        <Section title="How does Greenlane work?">
        	Greenlane utilizes park, tree and trail data to map scenic paths through Toronto for you to enjoy. 
        </Section>
        <Section title="Why are there no parks along my route?">
        	While we work hard to ensure that there are parks along your journey, Toronto doesn’t always cooperate. Not to worry, Greenlane also incorporates trail and tree coverage for you to experience. Enjoy!
        </Section>
        <Section title="Why do some parks not contain photos?">
        	For our photos, we rely on talented Instagrammers who are kind enough to add a location tag to their images.  Unfortunately, not every park pic on Instagram has been geo-located. Help us show off each park by tagging your Instagram photos with the park location and #GreenlaneTO.
        </Section>
        <Section title="Can my Instagram photos appear on Greenlane’s park pages?">
			Yes! If you take a photo along your greenlane and upload it to Instagram with the location, you may be featured. Heads up - photos are updated monthly, and only a select quantity of photos are added each month.         </Section>
        <Section title="Why do I have to sign in to favourite or share a route?">
        	In order for Greenlane to be tailored to your needs and keep track of your favourite routes, we require you to login.
        </Section>
        <Section title="What are the parameters in Toronto that Greenlane will create routes?">
			Toronto’s a big city. We can map greenlanes from the North (Steeles Ave) to the South (Downtown Toronto, including the Toronto Islands), and from East (Scarborough Pickering Town Line, including Rouge Park) to West (Dixie Road, Highway 407).
        </Section>
        <Section title="Will my greenlane always be a longer route than my regular route?">
        	Not necessarily. Some green routes may be equal to - or shorter than -your everyday route. Remember, you can always tell us how fast or green you’d like your greenlane to be.
        </Section>
      </div>
    );
  }
});

// STATIC PAGE CONTROLLER //////////////////////////////////////////////////////////

var PageController = React.createClass({
	getInitialState: function(){
		return {
			'activePage': null,
			'saved': [],
			'containerCSS': Classnames(
								'staticPageContainer',
								'hide',
								ScenicStore.getLayout().containerMask
							),
		};
	},

	favSection: function(){
    console.log(this.state.saved);
		return (
			<div className="viewContainer">
			<div className="staticTitle">favourited routes</div>
			<div className='favouritedRoute'>
			{
			    this.state.saved.map(function(route, key) {
			        var destFav = 'to: ' + route.destinationName +  '\n' + 'from: '  + route.originName;
			        var transitType = route.transit == 'cycling' ? <div><div className='bikeGrey'></div>{destFav}</div>: false || route.transit == 'walking' ? <div><div className='walkGrey'></div>{destFav}</div> : false;
			    	console.log('ROUTE', route.originName)
			        return  <Section title={transitType}>
								<div>{route.formatted.duration}</div>
								<div>{route.formatted.distance}</div>
								<div>{route.formatted.date}</div>
								<div className="parkList">{route.info.parks}</div>
								<div onClick={Navigate.generateSingleton.bind(this, route)} className="favGo goToRoute"></div>
								<div key={key} className="favDelete"></div>
							</Section>

				})
			}
				</div>
			</div>
		);
	},
	aboutUs: function(){
		return (
			<div className="viewContainer">
				<h1 className="staticTitle">about</h1>
				<div className="logo"></div>
					<p>	We’re a group of interns at Critical Mass, an experience design agency based in Toronto.</p>
					<p>	Though we all specialize in different areas, the one thing we have in common is our love for our city and the great outdoors.</p>
					<p>	We wanted to create something that used the city’s green spaces to make Torontonians’ lives just a little bit better.  So we got together, thought long and hard and came up with Greenlane - an app that uses park, tree and trail data to map scenic routes through the city.</p>
					<p>	So next time you’re moving through Toronto, choose Greenlane and see the city differently.</p>
				<hr/>
				<h3>the team</h3>
				<div className="theTeam"></div>
			</div>
		);
	},

	FAQ: function(){
		return (
			<Accordion title="frequently asked questions" />
		);
	},

	privacy: function(){
		return (
			<div className="viewContainer">
				<h1 className="staticTitle">privacy</h1>
				<p>We’re a group of interns at Critical Mass, an experience design agency based in Toronto.</p>
				<p>Though we all specialize in different areas, the one thing we have in common is our love for our city and the great outdoors.</p>
				<p>We wanted to create something that used the city’s green spaces to make Torontonians’ lives just a little bit better. So we got together, thought long and hard and came up with Greenlane - an app that uses park, tree and trail data to map scenic routes through the city.</p>
				<p>	So next time you’re moving through Toronto, choose Greenlane and see the city differently.</p>
			</div>
		);
	},
	tutorial: function(){
	return (
		<div className="viewContainer tutorial">
			<TutorialSection/>
		</div>
	);
},

	componentDidMount: function(){
		window.hrr = this;
		ScenicStore.addChangeListener(this.updateState);


    $(document).on('click', '.favDelete', function(){
      var routeId = parseFloat($(this).attr('key'));
      var _this = this;
      $.ajax
       ({
           type: "POST",
           url: 'http://localhost:3000/delete-route',
           dataType: 'json',
           //json object to sent to the authentication url
           data: {
             authId: parseFloat(readCookie('authId')),
             type: readCookie('type'),
             routeId: routeId
           },
           success: function () {
             $(_this).parent().parent().fadeOut();
           }
       })
    })


	},
	updateState: function(){
		var containerCSS;
		if (!ScenicStore.getActivePage()){
			containerCSS = Classnames(
								'staticPageContainer',
								'hide',
								ScenicStore.getLayout().containerMask
							);
		}
		else{
			containerCSS = Classnames(
								'staticPageContainer',
								ScenicStore.getLayout().containerMask
							);
		}


		console.log(ScenicStore.getActivePage());
		console.log(readCookie('authenticated'));
		if ((ScenicStore.getActivePage() == 'favSection') && readCookie('authenticated')){
			$.get("http://localhost:3000/favourite-routes", {
				authId: parseFloat(readCookie('authId')),
				type: readCookie('type')
			},
			function(res, err){
				console.log(res);
				console.log(err);

				this.setState({'saved': res});

				setTimeout(function(){
					this.setState({
						'activePage': ScenicStore.getActivePage(),
						'containerCSS': containerCSS,
					})
				}.bind(this), 10)

			}.bind(this));
		}
		else{
			this.setState({
				'activePage': ScenicStore.getActivePage(),
				'containerCSS': containerCSS,
			})
		}
	},
	render: function() {
		return (
		    <div className={this.state.containerCSS}>
		    	{this.state.activePage ? this[this.state.activePage]() : null}
		    </div>
		);
	}
});

module.exports = PageController;
