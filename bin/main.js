(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnimationManager = function () {
  function AnimationManager() {
    _classCallCheck(this, AnimationManager);

    this._objects = [];
  }

  _createClass(AnimationManager, [{
    key: "objects",
    value: function objects() {
      return this._objects;
    }
  }, {
    key: "register",
    value: function register(obj) {
      this.objects().push(obj);
    }
  }, {
    key: "start",
    value: function start() {
      setInterval(function () {
        this.objects().forEach(function (el) {
          el.triggerAnimation();
        });
      }.bind(this), 1);
    }
  }]);

  return AnimationManager;
}();

exports.default = AnimationManager;

},{}],2:[function(require,module,exports){
"use strict";

var _animation_manager = require("./animation_manager");

var _animation_manager2 = _interopRequireDefault(_animation_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Rectangle = require('./rectangle.js').Rectangle;
window.AnimationManager = new _animation_manager2.default();

},{"./animation_manager":1,"./rectangle.js":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = exports.Rectangle = function () {
  function Rectangle(canvas) {
    var colour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'red';

    _classCallCheck(this, Rectangle);

    this._config = {
      moveSpeed: 20,
      colour: colour
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

  _createClass(Rectangle, [{
    key: 'config',
    value: function config() {
      return this._config;
    }
  }, {
    key: 'canvas',
    value: function canvas() {
      return this._canvas;
    }
  }, {
    key: 'rect',
    value: function rect() {
      return this._rect;
    }
  }, {
    key: 'position',
    value: function position() {
      return this._position;
    }
  }, {
    key: 'movementBuffer',
    value: function movementBuffer() {
      return this._movementBuffer;
    }
  }, {
    key: 'isMoving',
    value: function isMoving(stat) {
      if (typeof stat !== "undefined") {
        this._isMoving = stat;
      }
      return this._isMoving;
    }
  }, {
    key: 'make',
    value: function make() {
      this._rect = new fabric.Rect({
        left: 0,
        top: 0,
        fill: this.config().colour,
        width: 20,
        height: 20
      });

      this.canvas().add(this.rect());
    }
  }, {
    key: 'moveRight',
    value: function moveRight() {
      var left = this.position().left;
      left += this.config().moveSpeed;
      this.position().left = left;

      this.registerMovement('left', left);
    }
  }, {
    key: 'moveLeft',
    value: function moveLeft() {
      var left = this.position().left;
      left -= this.config().moveSpeed;
      this.position().left = left;

      this.registerMovement('left', left);
    }
  }, {
    key: 'moveUp',
    value: function moveUp() {
      var top = this.position().top;
      top -= this.config().moveSpeed;
      this.position().top = top;

      this.registerMovement('top', top);
    }
  }, {
    key: 'moveDown',
    value: function moveDown() {
      var top = this.position().top;
      top += this.config().moveSpeed;
      this.position().top = top;

      this.registerMovement('top', top);
    }
  }, {
    key: 'stay',
    value: function stay() {
      var top = this.position().top;
      this.position().top = top;

      this.registerMovement('top', top);
    }
  }, {
    key: 'registerMovement',
    value: function registerMovement(property, value) {
      this.movementBuffer().push({ property: property, value: value });
    }
  }, {
    key: 'triggerAnimation',
    value: function triggerAnimation() {
      if (!this.isMoving() && this.movementBuffer().length > 0) {
        var movement = this.movementBuffer().shift();
        this.isMoving(true);
        this.rect().animate(movement.property, movement.value, {
          duration: 100,
          onChange: this.canvas().renderAll.bind(this.canvas()),
          onComplete: function () {
            this.isMoving(false);
          }.bind(this)
        });
      }
    }
  }, {
    key: 'fart',
    value: function fart() {
      /* literally, at those children request */
      var audio = new Audio('assets/sound.mp3');
      audio.play();
    }
  }, {
    key: 'move',
    value: function move() {
      var args = arguments;

      var loopCount = 1;
      var haveLoop = 0;

      if (Number.isInteger(args[args.length - 1])) {
        loopCount = args[args.length - 1];
        haveLoop = 1;
      }

      for (var l = 0; l < loopCount; l++) {
        for (var i = 0; i < args.length - haveLoop; i++) {
          switch (args[i]) {
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
  }]);

  return Rectangle;
}();

},{}]},{},[1,2,3]);
