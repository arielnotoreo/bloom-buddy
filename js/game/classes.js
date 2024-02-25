class Plant
{
    //sprite, integer, integer, integer, integer, integer
    constructor(pattern, timesWatered, waterFrequency, waterMaxLimit, lightFrequency, turningFrequency)
    {
        this.pattern = pattern;
        this.waterFrequency = waterFrequency;
        this.timesWatered = timesWatered;
        this.waterMaxLimit = waterMaxLimit;
        this.lightFrequency = lightFrequency;
        this.turningFrequency = turningFrequency;

        let daysSinceWatered = 0;
        timesWatered = 0;
        let alive = true;
    }

    WaterTracker()
    {
        //initializing a timer
        let timer;

        //sets a timer for 60 seconds
        startTimer()
        {
            timer = setTimeout(function(){}, 60000)
        }

        //resets the timer
        resetTimer()
        {
            clearTimeout(timer);
            startTimer();
        }

        WaterButtonClicked()
        {
            //check if the water button was clicked
            if (waterButtonClicked == true)
            {
                //adjust values and reset the timer
                daysSinceWatered = 0;
                timesWatered++;
                resetTimer();
            }
            else if (waterButtonClicked == false)
            {
                //adjust values and reset timer
                daysSinceWatered++;
                resetTimer();
            }
        }

        startTimer();

    }

    //all health operations here
    IsAlive()
    {
        //win conditions
        if (waterFrequency < daysSinceWatered || timesWatered > waterMaxLimit)
        {
            alive = false;
        }
    }
}