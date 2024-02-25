/*Worked on by Ariel Enzhu Cthwe

Plant and Tracker classes that create objects for each plant as necessary
*/

class Plant
{
    constructor(pattern, width, height, isIndoor)
    {
        this.pattern = new PIXI.Sprite(pattern);
        this.container = new PIXI.Container();
        this.container.addChild(this.pattern);
        this.width = width;
        this.height = height;
        this.x = 200;
        this.y = 200;

        this.alive = true;
        this.isIndoor = true;
    }

    setPosition(x, y) 
    {
        this.container.position.set(x, y);
    }
}

class Tracker 
{
    constructor(frequency, maxLimit) 
    {
        this.frequency = frequency;
        this.maxLimit = maxLimit;
        this.timer = null;
        this.count = 0;
        this.daysSince = 0;
    }

    startTimer() 
    {
        this.timer = setTimeout(() => {}, 60000);
    }

    resetTimer() 
    {
        clearTimeout(this.timer);
        this.startTimer();
    }

    //lose conditions
    isLimitReached() 
    {
        return this.frequency < this.daysSince || this.count > this.maxLimit;
    }
}

class WaterTracker extends Tracker 
{
    constructor(frequency, maxLimit) 
    {
        super(frequency, maxLimit);
    }
}

class LightTracker extends Tracker 
{
    constructor(frequency, maxLimit) 
    {
        super(frequency, maxLimit);
    }
}

class RotationTracker extends Tracker 
{
    constructor(frequency, maxLimit) 
    {
        super(frequency, maxLimit);
    }
}

