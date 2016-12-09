export default class AnimationManager {

  constructor(){
    this._objects = [];
  }

  objects(){
    return this._objects;
  }

  register(obj){
    this.objects().push(obj);
  }

  start(){
    setInterval(function(){
      this.objects().forEach(function(el){
        el.triggerAnimation();
      });
    }.bind(this), 1);
  }
}
