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

    setTimeout(function(){}, 30000);

    //possibly figure out if we need a reset if game over

    dayCounter++

    return dayCounter;
}