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
app.renderer.backgroundColor = 0xfbeee0;

// game screen dimensions
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

// load in assets
app.loader.add('images/cactus_dead.png');
app.loader.add('images/cactus_dying.png');
app.loader.add('images/cactus_healthy.png');
app.loader.add('images/primrose_dead.png');
app.loader.add('images/primrose_dying.png');
app.loader.add('images/primrose_healthy.png');
app.loader.add('images/turn.png');
app.loader.add('images/lamp.png');
app.loader.add('images/test-cactus.png');
app.loader.add('images/wateringcan.png');
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

//tracker variables
let waterButtonClicked = false;
let lightButtonClicked = false;
let rotationButtonClicked = false;

// sprites
let cactusSprite;
let primroseSprite;
let lightSprite;
let waterSprite;
let turnSprite;

// tutorial
let index;
let instructions;

// plant tracker variables
let plant;

let numClicks = 0;
let isWatered = false;

// create generic button style
let genericButtonStyle = new PIXI.TextStyle({
    fill: 0x3b3333,
    fontSize: 48,
    fontFamily: 'Dekko'
});

// FUNCTIONS -------------------------------------------------------------

function loadSprites() {
    cactusSprite = PIXI.Texture.from('images/test-cactus.png');
    primroseSprite = PIXI.Texture.from('images/primrose_healthy.png');
    lightSprite = PIXI.Texture.from('images/lamp.png');
    waterSprite = PIXI.Texture.from('images/wateringcan.png');
    turnSprite = PIXI.Texture.from('images/turn.png');
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
        fill: 0x3b3333,
        fontSize: 96,
        fontFamily: 'Dekko'
    });

    // position title and print to screen
    gameTitle.x = sceneWidth / 2 - gameTitle.width/2;
    gameTitle.y = 120;
    mainMenuScreen.addChild(gameTitle);

    // print plants to screen
    let cactus = new PIXI.Sprite(cactusSprite);
    cactus.width = 1640 / 5;
    cactus.height = 2360 / 5;
    cactus.x = sceneWidth - cactus.width;
    cactus.y = sceneHeight - cactus.height +100;
    cactus.interactive = false;
    cactus.buttonMode = false;
    mainMenuScreen.addChild(cactus);

    let primrose = new PIXI.Sprite(primroseSprite);
    primrose.width = 1640 / 5;
    primrose.height = 2360 / 5;
    primrose.x = primrose.width / 5 -100;
    primrose.y = sceneHeight - primrose.height +85;
    primrose.interactive = false;
    primrose.buttonMode = false;
    mainMenuScreen.addChild(primrose);

    // create game buttons
    let startButton = new PIXI.Text("Start Game");
    startButton.style = genericButtonStyle;
    startButton.x = sceneWidth/2 - startButton.width/2;
    startButton.y = sceneHeight - 200;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerup", function() {
        goTutorial();
    });
    startButton.on('pointerover', e => e.target.alpha = 0.7);
    startButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    mainMenuScreen.addChild(startButton);
}

//#region Fill Game Scene Methods
/*
function name: fillTutorialScene
purpose: populates game objects into tutorial scene
worked on by: McKenzie Lam
*/
function fillTutorialScene() {
    
    // draw the background of the tutorial
    graphics.beginFill(0x54856d, 1);
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
        "Give or take away light from \nyour plant by clicking the lamp.", 
        "Turn your plant so it gets \nan even amount of light"]
    
    let title = new PIXI.Text("Instructions");
    title.style = new PIXI.TextStyle({
        fill: 0x3b3333,
        fontSize: 40,
        fontFamily: 'Dekko'
    });
    title.x = sceneWidth / 2 - title.width/2;
    title.y = 50;
    tutorialScreen.addChild(title);

    index = 0;
    instructions = new PIXI.Text(info[index]);
    instructions.style = new PIXI.TextStyle({
        fill: 0x3b3333,
        fontSize: 40,
        fontFamily: 'Dekko'
    });
    instructions.x = sceneWidth / 2 - instructions.width/2 - 25;
    instructions.y = 120;
    tutorialScreen.addChild(instructions);

    // instructions button
    let nextButton = new PIXI.Text("--->", {
        fill: 0x3b3333,
        fontSize: 24,
        fontFamily: "Dekko"
      });
    nextButton.width = 50;
    nextButton.height = 50;
    nextButton.x = 570;
    nextButton.y = 320;
    nextButton.interactive = true;
    nextButton.buttonMode = true;
    nextButton.on("pointerup", function() {
        onNextButtonClick(info, goGame);
    });
    nextButton.on('pointerover', e => e.target.alpha = 0.7);
    nextButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    tutorialScreen.addChild(nextButton);

    // instant 'go to game' button for testing
    /*
    let gameButton = new PIXI.Text("Go To Game");
    gameButton.style = genericButtonStyle;
    gameButton.x = sceneWidth/2 - gameButton.width / 2;
    gameButton.y = sceneHeight - 200;
    gameButton.interactive = true;
    gameButton.buttonMode = true;
    gameButton.on("pointerup", function() {
        goGame();
    });
    gameButton.on('pointerover', e => e.target.alpha = 0.7);
    gameButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    tutorialScreen.addChild(gameButton);
    */
}

function fillEnvironmentScene() {
    let indoor = new PIXI.Text("Indoor");
    indoor.style = genericButtonStyle;
    indoor.x = sceneWidth/2 - indoor.width / 2 - 50;
    indoor.y = sceneHeight - 200;
    indoor.interactive = true;
    indoor.buttonMode = true;
    indoor.on("pointerup", function() {
        goGame();
    });
    indoor.on('pointerover', e => e.target.alpha = 0.7);
    indoor.on('pointerout', e => e.currentTarget.alpha = 1.0);
    tutorialScreen.addChild(indoor);

    let outdoor = new PIXI.Text("Outdoor");
    outdoor.style = genericButtonStyle;
    outdoor.x = sceneWidth/2 - outdoor.width / 2 + 50;
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
    //waterButton.on("pointerdown", function(){watterButtonClicked = true;});
    //waterButton.on("pointerdown", function(){console.log("water clicked"); watterButtonClicked = true;});
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
    //lightButton.on("pointerdown", lightButtonClicked = true);
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
    //turnButton.on("pointerdown", rotationButtonClicked = true);
    turnButton.on('pointerover', e => e.target.alpha = 0.7);
    turnButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    gameScreen.addChild(turnButton);
    //#endregion

    //#region labels
    let waterLabel = new PIXI.Text("Water");
    waterLabel.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 24,
        fontFamily: 'Dekko'
    })
    waterLabel.x = 150;
    waterLabel.y = sceneHeight - 50;
    gameScreen.addChild(waterLabel);

    let lightLabel = new PIXI.Text("Light");
    lightLabel.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 24,
        fontFamily: 'Dekko'
    })
    lightLabel.x = 350;
    lightLabel.y = sceneHeight - 50;
    gameScreen.addChild(lightLabel);

    let turnLabel = new PIXI.Text("Turn");
    turnLabel.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 24,
        fontFamily: 'Dekko'
    })
    turnLabel.x = 550;
    turnLabel.y = sceneHeight - 50;
    gameScreen.addChild(turnLabel);
    //#endregion

    // temp plant
    let tempPlant = new PIXI.Sprite(primroseSprite);
    tempPlant.width = 1640 / 5;
    tempPlant.height = 2360 / 5;
    tempPlant.x = sceneWidth / 2 - tempPlant.width / 5 - 100;
    tempPlant.y = sceneHeight / 2 - 300;
    tempPlant.interactive = false;
    tempPlant.buttonMode = false;
    gameScreen.addChild(tempPlant);

    // create the plant
    /*
    plant = new Plant(plantSprite, 100, 100);
    let plant = new Plant(plantSprite, 100, 100, true);
    gameScreen.addChild(plant.container);
    plant.setPosition(sceneWidth / 2, 200); */

    // begin the game
    //gameLoop();
    //gameLoop(plant);
}

function fillGameOverScene() {
    let text = new PIXI.Text("This is the womp womp");
    text.style = new PIXI.TextStyle({
        fill: 0xffffff,
        fontSize: 56,
        fontFamily: 'Dekko'
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
    app.renderer.backgroundColor = 0xfbeee0;
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
    app.renderer.backgroundColor = 0x3b3333;
    fillGameScene();
}

function goGameOver() {
    gameOverScreen.visible = true;
    gameScreen.visible = false;
    app.renderer.backgroundColor = 0x00ff00;
    fillGameOver();
}
//#endregion

/* Game loop function and helper methods that handles the win/lose conditions, and
majority game logic.
Worked on by Ariel Enzhu Cthwe
*/
function gameLoop(plant)
{
    while (plant.alive == true)
    {
        //plant.WaterTracker();
        //plant.IsAlive();
    }
}

function onNextButtonClick(text, scene) {
    // progress to the next line of text
    index++;
    // determine if there are more lines
    if (index < text.length) {
    
        // update story text
        instructions.text = text[index];
    } else {
      
      // transition to the next screen
      index = 0;
      text = null;
      scene();
      /*
    if (plant.isIndoor)
    {
        let waterTracker = new WaterTracker(3, 6);
        let lightTracker = new LightTracker(2, 4);
        let rotationTracker = new RotationTracker(4, 6);

        while (plant.alive == true)
        {
            //day cycle
            DayCycle(0);

            WaterTracker(waterTracker);
            LightTracker(lightTracker);
            RotationTracker(rotationTracker);
        }
    }
    else if (!plant.isIndoor)
    {
        let waterTracker = new WaterTracker(1, 3);
        let lightTracker = new LightTracker(3, 2);
        let rotationTracker = new RotationTracker(2, 6);

        while (plant.alive == true)
        {
            //day cycle
            DayCycle(0);
    
            WaterTracker(waterTracker);
            LightTracker(lightTracker);
            RotationTracker(rotationTracker);   
        }
    } */
}

//keeps track of the day counting and screen
function DayCycle(dayCounter)
{
    //this part can be subject to move to the main js file depending on how shit goes
    if (dayCounter % 2 == 0)
    {
        //display daytime screen
    }
    else if (dayCounter % 2 == 1)
    {
        //display nighttime screen
    }

    dayCounter++;

    setTimeout(function(){DayCycle(dayCounter)}, 30000);
}

function WaterTracker(waterTracker)
{
    waterTracker.startTimer();

    if (waterButtonClicked)
    {
        waterTracker.daysSince = 0;
        waterTracker.count++;       
    }
    else
    {
        waterTracker.daysSince++;
    }
    
    if (waterTracker.isLimitReached)
    {
        plant.alive = false;
    }
    else
    {
        waterTracker.count = 0;
    }

    waterTracker.resetTimer();
}

function LightTracker(lightTracker)
{
    lightTracker.startTimer();

    if (lightButtonClicked)
    {
        lightTracker.daysSince = 0;
        lightTracker.count++;
    }
    else
    {
        lightTracker.daysSince++;
    }

    if (lightTracker.isLimitReached)
    {
        plant.alive = false;
    }
    else
    {
        lightTracker.count = 0;
    }

    lightTracker.resetTimer();
}

function RotationTracker(rotationTracker)
{
    rotationTracker.startTimer();

    if (rotationButtonClicked)
    {
        rotationTracker.daysSince = 0;
        rotationTrackerTracker.count++;
    }
    else
    {
        rotationTracker.daysSince++;
    }

    if (rotationTracker.isLimitReached)
    {
        plant.alive = false;
    }
    else
    {
        rotationTracker.count = 0;
    }

    rotationTracker.resetTimer();
}
}