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
        let image = doc.createElement("div");
        let names = doc.createElement("div");
        let info1 = doc.createElement("div");
        let info2 = doc.createElement("div");

        //#region  CREATE INFO --------------------------------------------

        // HEADER CODE
        // NAVBAR CODE

        // IMAGE CODE
        let imageString = "";

        if (this.image) 
        {
            imageString += `<img src="${this.image}" alt="">`;
        }

        // NAMES CODE
        let namesString = "";
        namesString += `<h1>${this.commonName}</h1>`;
        namesString += `<h2>${this.scientificName}</h2>`;
        namesString += `<h3>${this.familyName}</h3>`;
        namesString += `<p>${this.description}</p>`

        // INFO1 CODE
        let info1String = "";
        info1String += `<p class = 'details'><strong>Duration</strong>: ${this.duration}</p>`;
        info1String += `<p class = 'details'><strong>Edibility</strong>: ${this.edible}</p>`;
        if(this.ediblePart != null)
        {
            info1String += `<p class = 'details'><strong>Edible Parts</strong>: `;
            let count = this.ediblePart.count;
            info1String += `${this.ediblePart[0]}`;
            for (let i = 1; i < count; i++) 
            {
                info1String += `, ${this.ediblePart[i]}`;
            }
            info1String += `</p>`;
        }
        info1String += `<p class = 'details'><strong>Average Height</strong>: ${this.height}</p>`;
        info1String += `<p class = 'details'><strong>Spread</strong>: ${this.spread}</p>`;
        info1String += `<p class = 'details'><strong>Native Locations</strong>: ${this.nativeLocation}`;
        {
            let count = this.nativeLocation.count;
            info1String += `${this.nativeLocation[0]}`;
            for (let i = 1; i < count; i++) 
            {
                info1String += `, ${this.nativeLocation[i]}`;
            }
            info1String += `</p>`;
        }
        info1String += `<p class = 'details'><strong>Introduced Locations</strong>: ${this.introducedLocation}</p>`;
        {
            let count = this.introducedLocation.count;
            info1String += `${this.introducedLocation[0]}`;
            for (let i = 1; i < count; i++) 
            {
                info1String += `, ${this.introducedLocation[i]}`;
            }
            info1String += `</p>`;
        }

        // INFO2 CODE
        let info2String = "";
        info1String += `<p class = 'details'><strong>Grow Time</strong>: ${this.growTime}</p>`;
        info1String += `<p class = 'details'><strong>Light</strong>: ${this.light}</p>`;
        info1String += `<p class = 'details'><strong>Temperature</strong>: ${this.temp}</p>`;
        info1String += `<p class = 'details'><strong>Humidity</strong>: ${this.humidity}</p>`;
        info1String += `<p class = 'details'><strong>Precipitation</strong>: ${this.precipitation}</p>`;
        info1String += `<p class = 'details'><strong>Sowing</strong>: ${this.sowing}</p>`;
        info1String += `<p class = 'details'><strong>Soil</strong>: ${this.soil}</p>`;

        // FOOTER CODE

        //#endregion

        // POPULATE DIVS ------------------------------------------
        image.innerHTML = imageString;
        names.innerHTML = namesString;
        info1.innerHTML = info1String;
        info2.innerHTML = info2String;
        
        // ADD CSS CLASSES ----------------------------------------
        image.classList.add("plantImage");
        names.classList.add("names");
        info1.classList.add("info1");
        info2.classList.add("info2");

        // APPEND ELEMENTS (None?) --------------------------------

        //idk if redirect would go here, another method, or somewhere else entirely
    }
}