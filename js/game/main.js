/*
file name: main.js
purpose: contains general logic for the game
worked on by: McKenzie Lam
*/

"use strict";

const graphics = new PIXI.Graphics();

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

// load in assets
app.loader.add('images/test-light-sprite.png');
app.loader.add('images/test-plant-sprite.png');
app.loader.add('images/test-water-sprite.png');
app.loader.onProgress.add(e => { console.log(`progress=${e.progress}`)});
app.loader.onComplete.add(setup);
app.loader.load();

// GLOBAL VARIABLES ------------------------------------------------------
let stage;
let mainMenuScreen;
let tutorialScreen;
let gameScreen;
let gameOverScreen;
let plantSprite;
let lightSprite;
let waterSprite;

// plant tracker variables
let numClicks = 0;
let isWatered = false;

// create generic button style
let genericButtonStyle = new PIXI.TextStyle({
    fill: 0xffffff,
    fontSize: 48,
    fontFamily: 'Comic Sans MS'
});

// FUNCTIONS -------------------------------------------------------------

function loadSprites() {
    plantSprite = PIXI.Texture.from('images/test-plant-sprite.png');
    lightSprite = PIXI.Texture.from('images/test-light-sprite.png');
    waterSprite = PIXI.Texture.from('images/test-water-sprite.png');
}

/*
function name: setup
purpose: sets up game screens of the game
worked on by: McKenzie Lam
*/
function setup() {
    stage = app.stage;

    // create the main menu scene
    mainMenuScreen = new PIXI.Container();
    mainMenuScreen.visible = true;
    stage.addChild(mainMenuScreen);

    // create the tutorial scene
    tutorialScreen = new PIXI.Container();
    tutorialScreen.visible = false;
    stage.addChild(tutorialScreen);

    // create the game screen
    gameScreen = new PIXI.Container();
    gameScreen.visible = false;
    stage.addChild(gameScreen);

    // create game over screen
    gameOverScreen = new PIXI.Container();
    gameOverScreen.visible = false;
    stage.addChild(gameOverScreen);

    fillMainMenuScene();
    loadSprites();
} 

/*
function name: fillMainMenuScene
purpose: populates the main menu scene with all game objects
worked on by: McKenzie Lam
*/
function fillMainMenuScene() {

    // create title text
    let gameTitle = new PIXI.Text("Bloom a Buddy");
    gameTitle.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 96,
        fontFamily: 'Arial'
    });

    // position title and print to screen
    gameTitle.x = 120;
    gameTitle.y = 120;
    mainMenuScreen.addChild(gameTitle);

    // create game buttons
    let startButton = new PIXI.Text("Start Game");
    startButton.style = genericButtonStyle;
    startButton.x = sceneWidth/2 - 50;
    startButton.y = sceneHeight - 200;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerup", function() {
        goTutorial();
    });
    startButton.on('pointerover', e => e.target.alpha = 0.7);
    startButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    mainMenuScreen.addChild(startButton);

    /* maybe figure out new way to do buttons?
    let startButton = new Button();
    startButton.options.text = "Start";
    startButton.options.width = 50;
    startButton.options.height = 50;
    */
}

//#region Fill Game Scene Methods
/*
function name: fillTutorialScene
purpose: populates game objects into tutorial scene
worked on by: McKenzie Lam
*/
function fillTutorialScene() {
    
    let text = new PIXI.Text("This is the instructions");
    text.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 56,
        fontFamily: 'Arial'
    });
    text.x = 10;
    text.y = 10;
    tutorialScreen.addChild(text);

    // create game buttons
    let gameButton = new PIXI.Text("Go To Game");
    gameButton.style = genericButtonStyle;
    gameButton.x = sceneWidth/2 - 50;
    gameButton.y = sceneHeight - 200;
    gameButton.interactive = true;
    gameButton.buttonMode = true;
    gameButton.on("pointerup", function() {
        goGame();
    });
    gameButton.on('pointerover', e => e.target.alpha = 0.7);
    gameButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    tutorialScreen.addChild(gameButton);
}


/*
function name: fillGameScene
purpose: populates game objects into game scene
worked on by: McKenzie Lam*/

function fillGameScene() {
    // create game buttons
    /*
    let gameButton = new PIXI.Text("LOSE");
    gameButton.style = genericButtonStyle;
    gameButton.x = sceneWidth/2 - 50;
    gameButton.y = sceneHeight - 200;
    gameButton.interactive = true;
    gameButton.buttonMode = true;
    gameButton.on("pointerup", function() {
        goGameOver();
    });
    gameButton.on('pointerover', e => e.target.alpha = 0.7);
    gameButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    gameScreen.addChild(gameButton); */

    /*
    let plant = new PIXI.Text("PLANT");
    plant.style = genericButtonStyle;
    plant.x = sceneWidth/2 - 50;
    plant.y = sceneHeight - 200;
    plant.interactive = true;
    plant.buttonMode = true;
    plant.on("pointerup", function() {
        goGameOver();
    });
    plant.on('pointerover', e => e.target.alpha = 0.7);
    plant.on('pointerout', e => e.currentTarget.alpha = 1.0);
    gameScreen.addChild(plant); */

    let waterButton = new PIXI.Sprite(waterSprite);
    waterButton.width = 100;
    waterButton.height = 100;
    waterButton.x = sceneWidth/2 - 200;
    waterButton.y = sceneHeight - 150;
    waterButton.interactive = true;
    waterButton.buttonMode = true;
    waterButton.on("pointerup", clicked);
    waterButton.on('pointerover', e => e.target.alpha = 0.7);
    waterButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    gameScreen.addChild(waterButton);

    let waterLabel = new PIXI.Text("Water");
    waterLabel.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 24,
        fontFamily: 'Arial'
    })
    waterLabel.x = sceneWidth/2 - 200;
    waterLabel.y = sceneHeight - 100;
    gameScreen.addChild(waterLabel);

    let plant = new Plant(plantSprite, 0, 1, 2, 0, 0);

    /*
    let tempText = new PIXI.Text(numClicks);
    tempText.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 56,
        fontFamily: 'Arial'
    });
    tempText.x = 10;
    tempText.y = 10;
    gameScreen.addChild(tempText);

    let boolText = new PIXI.Text(isWatered);
    boolText.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 56,
        fontFamily: 'Arial'
    });
    boolText.x = 40;
    boolText.y = 40;
    gameScreen.addChild(boolText);
    */
}

// MOVE THESE METHODS LATER !!!!!!!!!!!!!!!!!!!!!!!!!!!


function clicked() {
    numClicks++;
    /*
    if (numClicks == 1)
    {
        isWatered = true;
    }
    else {
        isWatered = false;
    } */
}

// ----------------------------------------------------




function fillGameOverScene() {
    let text = new PIXI.Text("This is the womp womp");
    text.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 56,
        fontFamily: 'Arial'
    });
    text.x = 10;
    text.y = 10;
    gameOverScreen.addChild(text);
}
//#endregion

//#region State Switch Methods

/*
function name: goTutorial
purpose: transitions to the tutorial scene
worked on by: McKenzie Lam
*/
function goTutorial() {
    tutorialScreen.visible = true;
    gameScreen.visible = false;
    mainMenuScreen.visible = false;
    app.renderer.backgroundColor = 0xFF0000;
    fillTutorialScene();
}

/*
function name: goGame
purpose: transitions to the game scene
worked on by: McKenzie Lam
*/
function goGame() {
    tutorialScreen.visible = false;
    gameScreen.visible = true;
    mainMenuScreen.visible = false;
    app.renderer.backgroundColor = 0xFF0080;
    fillGameScene();
}

function goGameOver() {
    gameOverScreen.visible = true;
    gameScreen.visible = false;
    app.renderer.backgroundColor = 0x00ff00;
    fillGameOver();
}
//#endregion