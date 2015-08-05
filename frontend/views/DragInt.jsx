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
initResizer: function(){
  if ($('#drag-cont').length && $('#resizer').length){
    // Plant the draggable to where it should be.
    var seedResizer = ($("#drag-cont").height()-$("#resizable-element").height()) + 'px';
    // Doesn't seem to set the top attribute the jQuery way?
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
},
render: function() {
    return (
      <div className="row" id="timeSlider">
        <p className="introTag">i want my greenlane to be</p>
        <p className="scaleG">greener</p>
        <div id="drag-container" className="row">
            <div id="resize-cont" className="col s8 offset-s2 m6 offset-m4 l8 offset-l2">
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
        <button onClick={Navigate.generateRoute} className="btn-secondary col s5 Time_Submit">map it</button>
      </div>
    );
  }
});


module.exports = TimeDrag;
