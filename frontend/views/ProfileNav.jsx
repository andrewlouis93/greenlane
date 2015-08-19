var React = require('react');
var Classnames = require('classnames');
var config = require('../config.js');
var Analytics = require('../stores/Analytics.jsx');
var Actions = require('../stores/Actions.jsx');
var ScenicStore = require('../stores/Stores.jsx');


function readCookie(name) {
    var value = (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
    // console.log('cookie value', value);
    return (value == null) ? false : decodeURIComponent(value);
}

var ProfileNav = React.createClass({
  validPassport: function(){
    return (this.props.passport && Object.keys(this.props.passport).length);
  },
  componentDidMount: function(){

    var auth = readCookie('authenticated');
    // console.log(auth);

    if (auth){
      this.setState({
        auth: true,
        authId: readCookie('authId'),
        type: readCookie('type'),
        displayName: readCookie('displayName'),
        profileUrl: readCookie('profileUrl') ? readCookie('profileUrl') : '/public/assets/no-profile.svg', // returns false if no picture
      })
    }else{
      this.setState({ auth : false });
    }
  },
  clearCookies: function(){
    document.cookie = 'authenticated' + '=; Max-Age=0';
    this.setState({auth: false});
    return false;
  },
  userButtons: function(){
    return([
        <li id="accountName">
          <img src={this.state.profileUrl} className="profileImage"></img>
          <h2>{this.state.displayName}</h2>
        </li>
      ]
    )
  },
  logoutButton: function(){
      return  (<li>
          <a onClick={this.clearCookies}>
            logout
          </a>
        </li>)
  },
  loginButtons: function(){
    // $ syntax: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings
    return ([
      <div className="loginStyles">

        <div className="loginSection">
          <li>
            <a href={`http://greenlane.io/auth/facebook`} className="btn-facebook">
              <i className="fa fa-facebook left fa-2x"></i>sign in with facebook</a>
          </li>
          <li>
            <a href={`http://greenlane.io/auth/google`} className="btn-google">
              <i className="fa fa-google left fa-2x"></i>sign in with google</a>
          </li>
        </div>
        </div>
    ])
  },
  favouritedRoutes: function(){
    return (<li>
              <a onClick={Actions.setActivePage.bind(this,'favSection')}>
                <i className="star left"></i>
                  favourited routes
              </a>
          </li>)
  },
  activateShare: function(){
    $("#sidenav-overlay").trigger('click');
    Actions.activateError('share');
  },
  profileButtons: function(){
    return ([
      <div>
        <div className="profileOpt">
            {(this.state && this.state.auth) ? this.favouritedRoutes() : false}
            <li><a onClick={this.activateShare}><i className="share left Social_Initiate"></i>share</a></li>
        </div>
        <div className="footer">
          <li><a onClick={Actions.setActivePage.bind(this,'FAQ')}>faq</a></li>
          <li><a onClick={Actions.setActivePage.bind(this,'aboutUs')}>about</a></li>
          <li><a onClick={Actions.setActivePage.bind(this,'tutorial')}>tutorial</a></li>
          <li><a onClick={Actions.setActivePage.bind(this,'privacy')}>privacy</a></li>
          { (this.state && this.state.auth) ? this.logoutButton() : false }
        </div>
      </div>
    ])
  },
  authButtons: function(){
    return ( ( this.state && this.state.auth )? this.userButtons() : this.loginButtons() );
  },
  menuAnalytics: function(){
    if ($('#sidenav-overlay'))
      Analytics.virtualPage('Menu','/menu');
  },
  render: function() {
    return (
      <nav id='top-nav'>
        <ul onClick={this.menuAnalytics} id="slide-out" className="side-nav">
          {this.authButtons()}
          {this.profileButtons()}
        </ul>
        <a data-activates="slide-out" className="button-collapse show-on-large right ">
          <div className="hamburger"></div>
        </a>
      </nav>
    );
  }
});

module.exports = ProfileNav;
