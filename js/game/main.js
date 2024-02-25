/*
file name: main.js
purpose: contains general logic for the game
worked on by: McKenzie Lam, Ariel Cthwe
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
app.loader.add('images/test-turn-sprite.png');
app.loader.onProgress.add(e => { console.log(`progress=${e.progress}`)});
app.loader.onComplete.add(setup);
app.loader.load();

// GLOBAL VARIABLES ------------------------------------------------------
let stage;
let mainMenuScreen;
let tutorialScreen;
let gameScreen;
let gameOverScreen;
let environmentScreen;

// sprites
let plantSprite;
let lightSprite;
let waterSprite;
let turnSprite;

// plant tracker variables
let plant;
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
    turnSprite = PIXI.Texture.from('images/test-turn-sprite.png');
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

    // create the environment screen
    environmentScreen = new PIXI.Container();
    environmentScreen.visible = false;
    stage.addChild(environmentScreen);

    // create the game screen
    gameScreen = new PIXI.Container();
    gameScreen.visible = false;
    stage.addChild(gameScreen);

    // create game over screen
    gameOverScreen = new PIXI.Container();
    gameOverScreen.visible = false;
    stage.addChild(gameOverScreen);

    loadSprites();
    fillMainMenuScene();
} 

/*
function name: fillMainMenuScene
purpose: populates the main menu scene with all its game objects
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
    
    // draw the background of the tutorial
    graphics.beginFill(0x000000, 1);
    graphics.drawRect(50, 50, 700, 400);
    graphics.endFill();
    tutorialScreen.addChild(graphics);

    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawRect(100, 100, 600, 300);
    graphics.endFill();
    tutorialScreen.addChild(graphics);

    // display the text
    let info = [
        "Water your plant by clicking \nthe watering can", 
        "Give your plant light by \nclicking the lamp", 
        "Turn your plant so it gets \nan even amount of light",
        "If you need tips on how to \ncare for your plant, \nclick the guide"]
    
    let title = new PIXI.Text("Instructions");
    title.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 40,
        fontFamily: 'Arial'
    });
    title.x = sceneWidth / 2 - title.width/2;
    title.y = 50;
    tutorialScreen.addChild(title);

    let index = 0;
    let instructions = new PIXI.Text(info[index]);
    instructions.style = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 40,
        fontFamily: 'Arial'
    });
    instructions.x = sceneWidth / 2 - instructions.width/2;
    instructions.y = 120;
    tutorialScreen.addChild(instructions);

    // instructions button
    let nextButton = new PIXI.Text("--->", {
        fill: 0xffffff,
        fontSize: 48,
        fontFamily: "Arial"
      });
    nextButton.width = 100;
    nextButton.height = 100;
    nextButton.x = 150;
    nextButton.y = sceneHeight - 150;
    nextButton.interactive = true;
    nextButton.buttonMode = true;
    nextButton.on("pointerup", function() {
        onNextButtonClick(info, goEnvironmentScene, index);
      });
    nextButton.on('pointerover', e => e.target.alpha = 0.7);
    nextButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    tutorialScreen.addChild(nextButton);

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

function fillEnvironmentScene() {
    let indoor = new PIXI.Text("Go To Game");
    indoor.style = genericButtonStyle;
    indoor.x = sceneWidth/2 - 50;
    indoor.y = sceneHeight - 200;
    indoor.interactive = true;
    indoor.buttonMode = true;
    indoor.on("pointerup", function() {
        goGame();
    });
    indoor.on('pointerover', e => e.target.alpha = 0.7);
    indoor.on('pointerout', e => e.currentTarget.alpha = 1.0);
    tutorialScreen.addChild(indoor);

    let outdoor = new PIXI.Text("Go To Game");
    outdoor.style = genericButtonStyle;
    outdoor.x = sceneWidth/2 - 50;
    outdoor.y = sceneHeight - 200;
    outdoor.interactive = true;
    outdoor.buttonMode = true;
    outdoor.on("pointerup", function() {
        goGame();
    });
    outdoor.on('pointerover', e => e.target.alpha = 0.7);
    outdoor.on('pointerout', e => e.currentTarget.alpha = 1.0);
    tutorialScreen.addChild(outdoor);
}

/*
function name: fillGameScene
purpose: populates game objects into game scene
worked on by: McKenzie Lam*/

function fillGameScene() {
    //#region GAME BUTTONS
    // water button
    let waterButton = new PIXI.Sprite(waterSprite);
    waterButton.width = 100;
    waterButton.height = 100;
    waterButton.x = 150;
    waterButton.y = sceneHeight - 150;
    waterButton.interactive = true;
    waterButton.buttonMode = true;
    waterButton.on("pointerdown", function(){watterButtonClicked = true;});
    waterButton.on('pointerover', e => e.target.alpha = 0.7);
    waterButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    gameScreen.addChild(waterButton);

    // light button
    let lightButton = new PIXI.Sprite(lightSprite);
    lightButton.width = 100;
    lightButton.height = 100;
    lightButton.x = 350;
    lightButton.y = sceneHeight - 150;
    lightButton.interactive = true;
    lightButton.buttonMode = true;
    //lightButton.on("pointerup", clicked);
    lightButton.on('pointerover', e => e.target.alpha = 0.7);
    lightButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    gameScreen.addChild(lightButton);

    // turn button
    let turnButton = new PIXI.Sprite(turnSprite);
    turnButton.width = 100;
    turnButton.height = 100;
    turnButton.x = 550;
    turnButton.y = sceneHeight - 150;
    turnButton.interactive = true;
    turnButton.buttonMode = true;
    //turnButton.on("pointerup", clicked);
    turnButton.on('pointerover', e => e.target.alpha = 0.7);
    turnButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    gameScreen.addChild(turnButton);
    //#endregion

    //#region TEMP LABELS
    let waterLabel = new PIXI.Text("Water");
    waterLabel.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 24,
        fontFamily: 'Arial'
    })
    waterLabel.x = 150;
    waterLabel.y = sceneHeight - 100;
    gameScreen.addChild(waterLabel);

    let lightLabel = new PIXI.Text("Light");
    lightLabel.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 24,
        fontFamily: 'Arial'
    })
    lightLabel.x = 350;
    lightLabel.y = sceneHeight - 100;
    gameScreen.addChild(lightLabel);

    let turnLabel = new PIXI.Text("Turn");
    turnLabel.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 24,
        fontFamily: 'Arial'
    })
    turnLabel.x = 550;
    turnLabel.y = sceneHeight - 100;
    gameScreen.addChild(turnLabel);
    //#endregion

    // create the plant
    plant = new Plant(plantSprite, 100, 100);
    gameScreen.addChild(plant.container);
    plant.setPosition(sceneWidth / 2, 200);

    // begin the game
    gameLoop();
}

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

function goEnvironment() {
    environmentScreen.visible = true;
    tutorialScreen = false;
    app.renderer.backgroundColor = 0xFFFF00;
    fillEnvironmentScene();
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


function gameLoop()
{
    while (plant.alive == true)
    {
        plant.WaterTracker();
        plant.IsAlive();
    }
}