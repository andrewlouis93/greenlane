var Dispatcher = require('./Dispatcher.jsx');
var Store = require('./Stores.jsx');
var Analytics = require('./Analytics.jsx');

var ScenicActions = {
  /**
   * @param  {string} text
   */
  test: function(text) {
    Dispatcher.dispatch({
      actionType: 'test',
    });
  },
  setTransitMode: function(_mode){
    Dispatcher.dispatch({
      actionType: 'setTransitMode',
      transit: _mode
    });
  },
  setLoop: function(){
    Dispatcher.dispatch({
      actionType: 'setMode',
      loop: true
    });
  },
  setRoute: function(){
    Dispatcher.dispatch({
      actionType: 'setMode',
      loop: false
    });
  },
  setGreenpoints: function(_results){
    Dispatcher.dispatch({
      actionType: 'setGreenpoints',
      greenpoints: _results
    });
  },
  setSessionState: function(_prop, _value){
    Dispatcher.dispatch({
      actionType: 'setSessionState',
      prop: _prop,
      value: _value
    });
  },
  setGreenness: function(_greenness){
    Dispatcher.dispatch({
      actionType: 'setGreenness',
      greenness: _greenness
    })
  },
  updateMenu: function(_menuState){
    Dispatcher.dispatch({
      actionType: 'updateMenu',
      menuState: _menuState
    });
  },
  // Takes in true or false
  setDirectionsState: function(_directionsState){
    Dispatcher.dispatch({
      actionType: 'setDirectionsState',
      directionsState: _directionsState
    });
  },
  updateActivePath: function(_activePath){
    Dispatcher.dispatch({
      actionType: 'updateActivePath',
      activePath: _activePath
    });
  },
  isLoading: function(_isLoading){
    if (_isLoading)
      Analytics.virtualPage('Setup|Loading','/setup/loading');

    Dispatcher.dispatch({
      actionType: 'isLoading',
      isLoading: _isLoading
    });
  },
  setActivePage: function(_activePage){
    console.log('setActivePage');
    console.log(_activePage);

    // Virtual Page Views
    switch(_activePage){
      case 'FAQ':
        Analytics.virtualPage('Menu|FAQ','/menu/faq');
        break;
      case 'aboutUs':
        Analytics.virtualPage('Menu|About','/menu/about');
        break;
    }

    Dispatcher.dispatch({
      actionType: 'setActivePage',
      activePage: _activePage
    })
    $('#sidenav-overlay').trigger('click');
  },
  setParkMode: function(){
    console.log('setParkMode');
    Dispatcher.dispatch({
      actionType: 'setParkMode'
    })
  },
  goBack: function(){
    Dispatcher.dispatch({
      actionType: 'goBack'
    })
  },
  initialized: function(){
    Dispatcher.dispatch({
      actionType: 'initialized'
    })
  },
  activateError: function(_state){
    Dispatcher.dispatch({
      actionType: 'activateError',
      state: _state
    })
  },
  deactivateError: function(){
    Dispatcher.dispatch({
      actionType:'deactivateError'
    })
  },
  timeOut: function(){
    Dispatcher.dispatch({
      actionType:'timeOut'
    })
  },
  resetTimeout: function(){
    Dispatcher.dispatch({
      actionType:'resetTimeout'
    })
  }
};

module.exports = ScenicActions;
