var React = require('react/addons');
var Slider = require('react-slick');
var Classnames = require('classnames');

var Navigate = require('../stores/Navigate.jsx');
var Analytics = require('../stores/Analytics.jsx');
var Actions = require('../stores/Actions.jsx');
var ScenicStore = require('../stores/Stores.jsx');

var config = require('../config.js');

/*
 * Tutorial! Needs to be fixed.
*/
  var Slideshow = React.createClass({
    componentDidMount: function(){
      Analytics.virtualPage('Intro|Landing', '/intro/landing');
    },
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
  clickableRegions: function(){
    return [<a href={`${config.api_url}/auth/facebook`} id='clickable-fb' className='clickable-area'></a>,
            <a href={`${config.api_url}/auth/google`} id='clickable-google' className='clickable-area'></a>,
            <div onClick={this.props.startApplication} id='clickable-start' className='clickable-area'></div>]
  },

    render: function() {
      var settings = {
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: function(slideId){
          if (slideId != 7){
            var title = 'Intro|Page'+slideId;
            var url = '/intro/page'+slideId;
            Analytics.virtualPage(title, url);
          }
          else{
            Analytics.virtualPage('Intro|SignIn','/intro/sign-in');
          }
        }
      };
      // WTF is this ...settings syntax?
      return (
        <Slider {...settings}>
          {
            this.state.tutorialData.map(function(slide, id){
              var _bgStyle = {
                backgroundImage: 'url(' + slide.imagePath + ')'
              }
              return (<div>
                        <div  className="tutorialSlide" style={_bgStyle}></div>
                        {(id == (this.state.tutorialData.length - 1)) ? this.clickableRegions() : false}
                        <div>{slide.title}</div>
                        <div>{slide.subtitle}</div>
                      </div>)
            }.bind(this))
          }
        </Slider>
      );
  }

});


module.exports = Slideshow;
