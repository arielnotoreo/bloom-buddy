class Plant
{
    //sprite, integer, integer, integer, integer, integer
    constructor(pattern, width, height)
    {
        this.pattern = new PIXI.Sprite(pattern);
        this.container = new PIXI.Container();
        this.container.addChild(this.pattern);
        this.width = width;
        this.height = height;
        this.x = 200;
        this.y = 200;

        this.alive = true;
    }

    setPosition(x, y) {
        this.container.position.set(x, y);
    }
}

class Tracker {
    constructor(frequency, maxLimit) {
        this.frequency = frequency;
        this.maxLimit = maxLimit;
        this.timer = null;
        this.count = 0;
    }

    startTimer() {
        this.timer = setTimeout(() => {}, 60000);
    }

    resetTimer() {
        clearTimeout(this.timer);
        this.startTimer();
    }

    // buttonClicked() {
    //     if (buttonClicked) {
    //         this.count++;
    //         this.resetTimer();
    //     } else {
    //         this.resetTimer();
    //     }
    // }

    isLimitReached() {
        return this.frequency > this.count || this.count > this.maxLimit;
    }
}

class WaterTracker extends Tracker {
    constructor(frequency, maxLimit) {
        super(frequency, maxLimit);
    }
}

class LightTracker extends Tracker {
    constructor(frequency, maxLimit) {
        super(frequency, maxLimit);
    }
}

class RotationTracker extends Tracker {
    constructor(frequency, maxLimit) {
        super(frequency, maxLimit);
    }
}

// // Example usage
// const waterTracker = new WaterTracker(3, 5);
// waterTracker.startTimer();
// waterTracker.buttonClicked();
// console.log(waterTracker.isLimitReached()); // Check if limit is reached
