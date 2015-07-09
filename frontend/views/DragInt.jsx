var React = require('react');



var TimeDrag = React.createClass({
componentDidMount: function(){
  var svgCanvas = document.querySelector('.drag');
  var svgNS = 'http://www.w3.org/2000/svg';
  var rectangles = [];

  function Rectangle (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.stroke = 5;
    this.el = document.createElementNS(svgNS, 'rect');
    
    this.el.setAttribute('data-index', rectangles.length);
    this.el.setAttribute('class', 'edit-rectangle');
    rectangles.push(this);

    this.draw();
    svgCanvas.appendChild(this.el);
  }

  Rectangle.prototype.draw = function () {
    this.el.setAttribute('x', this.x + this.stroke / 2);
    this.el.setAttribute('y', this.y + this.stroke / 2);
    this.el.setAttribute('width' , this.w - this.stroke);
    this.el.setAttribute('height', this.h - this.stroke);
    this.el.setAttribute('stroke-width', this.stroke);
  }



 interact('.edit-rectangle')
  // change how interact gets the
  // dimensions of '.edit-rectangle' elements
  .rectChecker(function (element) {
    // console.log("Element if",);
    // console.log("this", this);
    // window.brrah = this;
    // find the Rectangle object that the element belongs to
    var rectangle = rectangles[element.getAttribute('data-index')];

    // return a suitable object for interact.js
    return {
      left  : rectangle.x + rectangle.h,
      top   : rectangle.y + rectangle.w,
      right : rectangle.x + rectangle.w,
      bottom: rectangle.y + rectangle.h
    };
  })
  .inertia({
    // don't jump to the resume location
    // https://github.com/taye/interact.js/issues/13
    zeroResumeDelta: true
  })
  .restrict({
    // restrict to a parent element that matches this CSS selector
    drag: 'drag',
    // only restrict before ending the drag
    endOnly: true,
    // consider the element's dimensions when restricting
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  })
  .draggable({
    max: Infinity,
    onmove: function (event) {
      var rectangle = rectangles[event.target.getAttribute('data-index')];

      rectangle.x += event.dx;
      rectangle.y += event.dy;
      rectangle.draw();
    }
  })
  .resizable({
    max: Infinity,
    onmove: function (event) {
      var rectangle = rectangles[event.target.getAttribute('data-index')];

      rectangle.w = Math.max(rectangle.w + event.dx, 10);
      rectangle.h = Math.max(rectangle.h + event.dy, 10);
      rectangle.draw();
    }
  });

interact.maxInteractions(Infinity);

  new Rectangle(50, 80, 80, 80);

},  
render: function() {
    return (
      <div>
        <svg className="drag"></svg>
      </div>
    );
  }
});

module.exports = TimeDrag;










