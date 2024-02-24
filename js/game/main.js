"use strict";
const app = new PIXI.Application(
  {
    width: 800,
    height: 500
  }
);

document.body.appendChild(app.view);

// change game background color
app.renderer.backgroundColor = 0x5e86f7;

// game screen dimensions
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;