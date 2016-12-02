var lines = {
  canvas: null,
  setCanvas: function(c){
    this.canvas = c;
  },
  lines: [],
  construct: function(c){
    this.setCanvas(c);

    this.canvas.add(this.createLine(20,0));
  },
  createLine: function(left,top){
    var l = new fabric.Line([0,500,0,0], {
      left: left,
      top: top,
      stroke: '#f49e42'
    });
    return l;
  }
};

function Rectangle(canvas, colour='red', position={}){
  var rectangle = {
    canvas: null,
    rect: null,
    isMoving: false,
    movementBuffer: [],
    config: {
      moveSpeed: 20,
      colour: 'red'
    },
    setCanvas: function(c){
      this.canvas = c;
    },
    setColour: function(c){
      this.config.colour = c;
    },
    position: {
      top: 0,
      left: 0
    },
    computedPosition: {
      top: 0,
      left: 0
    },
    getPosition: function(){
      return {
        top: this.rect.top,
        left: this.rect.left
      };
    },
    setComputedTop: function(top){
      this.computedPosition.top = top;
    },
    setComputedLeft: function(left){
      this.computedPosition.left = left;
    },
    make: function(){
      this.setCanvas(canvas);
      this.rect = new fabric.Rect({
        left: this.position.left,
        top: this.position.top,
        fill: this.config.colour,
        width: 20,
        height: 20
      });
      this.canvas.add(this.rect);
      return this;
    },
    moveLeft: function(){
      var left = this.computedPosition.left;
      left -= this.config.moveSpeed;
      this.computedPosition.left = left;

      this.animate('left', left);
    },
    moveRight: function(){
      var left = this.computedPosition.left;
      left += this.config.moveSpeed;
      this.computedPosition.left = left;

      this.animate('left', left);
    },
    moveUp: function(){
      var top = this.computedPosition.top;
      top -= this.config.moveSpeed;
      this.computedPosition.top = top;

      this.animate('top', top);
    },
    moveDown: function(){
      var top = this.computedPosition.top;
      top += this.config.moveSpeed;
      this.computedPosition.top = top;

      this.animate('top', top);
    },
    animate: function(property, value){
      this.movementBuffer.push({ "property": property, "value": value });
    },
    triggerAnimation: function(){
      if(!this.isMoving && this.movementBuffer.length > 0){

        if(this.config.colour == 'rainbow'){
          var colours = ['red','green','blue','yellow','gold','purple','silver','black'];
          this.rect.set("fill", colours[Math.floor(Math.random()*colours.length)]);
        }

        var movement = this.movementBuffer.shift();

        this.isMoving = true;
        this.rect.animate(movement.property, movement.value, {
          duration: 10,
          onChange: this.canvas.renderAll.bind(this.canvas),
          onComplete: function(){
            this.isMoving = false;
          }.bind(this)
        });
      }
    },

    move: function(){
      var args = arguments;

      var loopCount = 1;
      var haveLoop = 0;

      if(Number.isInteger(args[args.length-1])){
        loopCount = args[args.length-1];
        haveLoop = 1;
      }

      for(var l=0; l < loopCount; l++){
        for(var i=0 ; i < args.length - haveLoop ; i++){
          switch(args[i]){
            case 'up':
              this.moveUp();
              break;
            case 'down':
              this.moveDown();
              break;
            case 'right':
              this.moveRight();
              break;
            case 'left':
              this.moveLeft();
              break;
          }
        }
      }
      return this;
    }

  };
  var instance = rectangle;
  instance.setCanvas(canvas);
  instance.setColour(colour);
  instance.make();
  return instance;
}

var animationManager = {
  objects: [],
  register: function(obj){
    this.objects.push(obj);
  },
  start: function(){
    setInterval(function(){
      this.objects.forEach(function(el){
        el.triggerAnimation();
      });
    }.bind(this), 1);
  }
};
