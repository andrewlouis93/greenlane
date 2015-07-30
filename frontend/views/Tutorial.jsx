var React = require('react/addons');
var Slider = require('react-slick');
var Classnames = require('classnames');

var Navigate = require('../stores/Navigate.jsx');
var Actions = require('../stores/Actions.jsx');
var ScenicStore = require('../stores/Stores.jsx');

/*
 * Tutorial! Needs to be fixed.
*/
  var Slideshow = React.createClass({
    getInitialState: function(){
    return {
      'tutorialData' : [
        {imagePath : "materialize/img/png/1Walkthrough-02.svg"},
        {imagePath : "materialize/img/png/1Walkthrough-03.svg"},
        {imagePath : "materialize/img/png/1Walkthrough-04.svg"},
        {imagePath : "materialize/img/png/1Walkthrough-05.svg"},
        {imagePath : "materialize/img/png/1Walkthrough-06.svg"},
        {imagePath : "materialize/img/png/1Walkthrough-07.svg"},
        {imagePath : "materialize/img/png/1Walkthrough-08.svg"},
        {imagePath : "materialize/img/png/1Walkthrough-09.svg"},
      ]
    };
  },

    render: function() {
      var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };      
      // WTF is this ...settings syntax?
      return (
        <Slider {...settings}>
          {
            this.state.tutorialData.map(function(slide, id){
              var _bgStyle = {
                backgroundImage: 'url(' + slide.imagePath + ')'
              }
              return (<div className="">
                        <div className="tutorialSlide" style={_bgStyle}></div>
                        <div>{slide.title}</div>
                        <div>{slide.subtitle}</div>
                      </div>)
            })
          }       
        </Slider>
      );
  }

});


module.exports = Slideshow;