var React = require('react');
var ScenicStore = require('../stores/Stores.jsx');
var Actions = require('../stores/Actions.jsx');
var Navigate = require('../stores/Navigate.jsx');
var Analytics = require('../stores/Analytics.jsx');

function normalize(percentage){
  percentage = Math.floor(percentage*100);
  switch (percentage){
    case 0:
      return 1;
    case 33:
      return 2;
    case 66:
      return 3;
    case 100:
      return 4;
  }
}

var TimeDrag = React.createClass({
getInitialState: function(){
  return {
    'resizer-top': false
  }
},
initResizer: function(){

  var backButtonState = ScenicStore.getBackBtnState().states.length ? ScenicStore.getBackBtnState().states[ScenicStore.getBackBtnState().states.length-1] : null;

  if ($('#drag-cont').length && $('#resizer').length && (backButtonState != 'parkview')){
    // Plant the draggable to where it should be.
    var seedResizer = ($("#drag-cont").height()-$("#resizable-element").height()) + 'px';
    // Doesn't seem to set the top attribute the jQuery way?

    console.log("IN INIT RESIZER", seedResizer);
    document.getElementById('resizer').style.top= seedResizer;
  }
},
_onChange: function(){
  // this.initResizer();
},
handleSkip: function(clickEvent){
  Analytics.greenLevel(1);
  Actions.setGreenness(1);
  Navigate.generateRoute(clickEvent);
},
componentDidMount: function(){
  window.DragState = this.state;
  var _height = $('#resizer').height()/2;
  var _height_Cont = $('#resize-cont').height();
  ScenicStore.addChangeListener(this._onChange);
  window._draggy = this;
  this.initResizer();

  $('#resizer').draggable({
      drag: function() {
          var adjustTo = $(this).parent().height() - $(this).position().top - _height;
          // $('#resizable-element-two').css('height',  adjustTo );
          $('#resizable-element').css('height',  adjustTo );
      },
      axis: 'y',
      containment: '#resize-cont',
      stop: function(e, ui) {
        var grid_x = 0;
        var grid_y = _height_Cont/3;
        var elem = $( this );
        var sliderHeight = parseInt($('#resize-cont').css('height'));
        var top = parseInt(elem.css('top'));
        var cy = (top % grid_y);
        var new_top = (Math.abs(cy)+0.5*grid_y >= grid_y) ? (top - cy + (top/Math.abs(top))*grid_y) : (top - cy);

        ui.helper.stop(true).animate({
            top: new_top,
            opacity: 1,
        }, 200);

        var adjustTo = sliderHeight - new_top;

        console.log("RESIZING, NEW TOP", new_top);

        var greenness = normalize(adjustTo/$("#resizable-element").parent().height());

        // Analytics line here.
        Analytics.greenLevel(greenness);
        Actions.setGreenness(greenness);

        $("#resizable-element").animate({height:adjustTo},200);
      },
  });
  window.addEventListener('resize', this.initResizer);
},
componentWillUnmount: function(){
  window.removeEventListener('resize', this.initResizer)
  ScenicStore.removeChangeListener(this._onChange);
},
render: function() {
    return (
      <div className="row" id="timeSlider">
        <p className="introTag">i want my greenlane to be</p>
        <p className="scaleG">greener</p>
        <div id="drag-container" className="row">
            <div id="resize-cont">
              <div id="resizable-element">
              </div>
            </div>
            <div id="drag-cont">
              <div id="resizer" className="greenBoob">
              </div>
            </div>
            <p className="scaleG">faster</p>
        </div>


        <button onClick={this.handleSkip} className="btn-primary col s5 Green_Skip">skip</button>
        <button onClick={Navigate.generateRoute} className="btn-secondary col s5 Time_Submit" autoFocus>map it</button>
      </div>
    );
  }
});


module.exports = TimeDrag;
