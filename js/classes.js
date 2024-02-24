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
        document.implementation.createHTMLDocument(this.commonName);
        // Make the new webpage
        //idk if redirect would go here, another method, or somewhere else entirely
    }
}