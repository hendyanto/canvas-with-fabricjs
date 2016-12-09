export class Rectangle {
  constructor(canvas, colour = 'red', animationDuration = 100){
    this._config = {
      moveSpeed: 20,
      colour: colour,
      animationDuration: animationDuration
    };
    this._position = {
      left: 0,
      top: 0
    };
    this._canvas = canvas;
    this._rect = null;
    this._movementBuffer = [];
    this._isMoving;
    this.make();
  }

  config(){
    return this._config;
  }

  canvas(){
    return this._canvas;
  }

  rect(){
    return this._rect;
  }

  position(){
    return this._position;
  }

  movementBuffer(){
    return this._movementBuffer;
  }

  isMoving(stat){
    if(typeof stat !== "undefined"){
      this._isMoving = stat;
    }
    return this._isMoving;
  }

  make(){
    this._rect = new fabric.Rect({
      left: 0,
      top: 0,
      fill: this.config().colour,
      width: 20,
      height: 20
    });

    this.canvas().add(this.rect());
  }

  moveRight(){
    var left = this.position().left;
    left += this.config().moveSpeed;
    this.position().left = left;

    this.registerMovement('left', left);
  }

  moveLeft(){
    var left = this.position().left;
    left -= this.config().moveSpeed;
    this.position().left = left;

    this.registerMovement('left', left);
  }

  moveUp(){
    var top = this.position().top;
    top -= this.config().moveSpeed;
    this.position().top = top;

    this.registerMovement('top', top);
  }

  moveDown(){
    var top = this.position().top;
    top += this.config().moveSpeed;
    this.position().top = top;

    this.registerMovement('top', top);
  }

  stay(){
    var top = this.position().top;
    this.position().top = top;

    this.registerMovement('top', top);
  }

  registerMovement(property, value){
    this.movementBuffer().push({ property: property, value: value });
  }

  triggerAnimation(){
    if(!this.isMoving() && this.movementBuffer().length > 0){
      var movement = this.movementBuffer().shift();
      this.isMoving(true);
      this.rect().animate(movement.property, movement.value, {
        duration: this.config().animationDuration,
        onChange: this.canvas().renderAll.bind(this.canvas()),
        onComplete: function(){
          this.isMoving(false);
        }.bind(this)
      });
    }
  }

  fart(){ /* literally, at those children request */
    var audio = new Audio('assets/sound.mp3');
    audio.play();
  }

  move(){
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
          case 'stay':
            this.stay();
            break;
        }
      }
    }
  }
}
