var items = []
  , point = document.querySelector('svg').createSVGPoint();
  $('.item').css('height',window.innerHeight-100+"px");


function getCoordinates(e, svg) {
  point.x = e.clientX;
  point.y = e.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function Item(config) {
  Object.keys(config).forEach(function (item) {
    this[item] = config[item];
  }, this);
  this.el.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
  this.el.addEventListener('touchmove', this.touchMoveHandler.bind(this));
  this.el.addEventListener('touchstart', this.touchStartHandler.bind(this));
  this.el.addEventListener('touchend', this.touchEndHandler.bind(this));
}

Item.prototype = {
  update: function update(c) {
    this.clip.setAttribute('cx', c.x);
    this.clip.setAttribute('cy', c.y);
  },
  mouseMoveHandler: function mouseMoveHandler(e) {
    this.update(getCoordinates(e, this.svg));
  },
  touchMoveHandler: function touchMoveHandler(e) {
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) return this.update(getCoordinates(touch, this.svg));
  },
  touchStartHandler: function touchStartHandler(e) {
    e.preventDefault();
    $("circle, image").attr('class', 'animat');
    var touch = e.targetTouches[0];
    if (touch) return this.update(getCoordinates(touch, this.svg));
  },
  touchEndHandler: function touchEndHandler(e) {
    e.preventDefault();
    var touch = e.changedTouches[0];
    $("circle, image").attr('class', '');
    console.log('ads')
    //if (touch) return this.update(getCoordinates(touch, this.svg));
  }
};

[].slice.call(document.querySelectorAll('.item'), 0).forEach(function (item, index) {
  items.push(new Item({
    el: item,
    svg: item.querySelector('svg'),
    clip: document.querySelector('#clip-'+index+' circle'),
  }));
});

window.addEventListener('resize', function(event){
  $('.item').css('height',window.innerHeight-100+"px");
});