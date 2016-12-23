# README #

Made for programming lesson for primary schoolers.

This is a canvas implementation using fabric.js, to create rectangles and lines inside the canvas easily.

Trying to make sure it is easy for them to understand codes from basics, by:

- Using easy languages
- Minimalizing setups
- Using canvas so it is more interesting for the childrens

## **Usage** ##

`var one = new createNewRectangle('red', 100);`
first parameter -> Box colour
second parameter -> Box movement speed in ms

### available movements ###

```javascript
one.act('down');
one.act('up');
one.act('left');
one.act('right');
```

new function(direction, direction, ... , number of loop)

```
one.act('up','down',.......,5);
```
