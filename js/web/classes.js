class Plant
{
    constructor(commonName, scientificName, image, familyName, duration, description, 
        edible, ediblePart, height, growTime, sowing, light, humidity, temp, spread, 
        precipitation, soil, nativeLocation, introducedLocation)
    {
        this.commonName = commonName;
        this.scientificName = scientificName;
        this.image = image;
        this.familyName = familyName;
        this.duration = duration;
        this.description = description;
        this.edible = edible;
        if(edible)
        {
            this.ediblePart = ediblePart;
        }
        else
        {
            this.ediblePart = null;
        }
        this.height = height;
        this.growTime = growTime;
        this.sowing = sowing;
        this.light = light;
        this.humidity = humidity;
        this.temp = temp;
        this.spread = spread;
        this.precipitation = precipitation;
        this.soil = soil;
        this.nativeLocation = nativeLocation;
        this.introducedLocation = introducedLocation;
    }

    makePage()
    {
        // Make the new webpage
        let doc = document.implementation.createHTMLDocument(this.commonName);
        
        // CREATE ELEMENTS ----------------------------------------

        // CREATE INFO --------------------------------------------

        // HEADER CODE
        // NAVBAR CODE

        // IMAGE CODE
        let imageString = 
        // NAMES CODE
        // INFO1 CODE
        // INFO2 CODE

        // FOOTER CODE

        // POPULATE DIVS ------------------------------------------

        // ADD CSS CLASSES ----------------------------------------

        // APPEND ELEMENTS ----------------------------------------

        //idk if redirect would go here, another method, or somewhere else entirely
    }
}