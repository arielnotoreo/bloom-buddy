class Plant
{
    // WHY METHOD NO MOVE
    makeCard()
    {
        let tempString = "";
        tempString += "<div class = 'cardSmall'>"
        tempString += `<img src = "${this.image}" alt = "" height = 100px>`
        tempString += `<h3>${this.commonName}</h3>`
        tempString += "</div>"
        tempString += "<div class = 'cardExpand' display = none>"
        tempString += "<div class = 'expandLeft'>"
        tempString += `<h4>${this.scientificName}</h4>`
        tempString += `<p>${this.description}</p>`
        tempString += "</div>"
        tempString += "<div class = 'expandRight'>" 
        tempString += `<p>Duration: ${this.duration}</p>`
        tempString += `<p>Light: ${this.light}</p>`
        tempString += `<p>Humidity: ${this.humidity}</p>`
        tempString += `<p>Temperature: ${this.minTemp}-${this.maxTemp}</p>`
        tempString += `<p>Native Location(s): ${this.nativeLocation}</p>`
        tempString += '<div id="moreBtnContain"><button type="button" id="moreBtn">More info</button></div>'
        tempString += "</div>"
        tempString += "</div>"

        this.card = tempString;
    }
    
    constructor(commonName, scientificName, image, familyName, duration, description, 
        edible, ediblePart, height, growTime, sowing, light, humidity, minTemp, maxTemp, spread, 
        minPrecipitation, maxPrecipitation, soil, nativeLocation)
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
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
        this.spread = spread;
        this.minPrecipitation = minPrecipitation;
        this.maxPrecipitation = maxPrecipitation;
        this.soil = soil;
        this.nativeLocation = nativeLocation;
        this.card;
    }

    makePage()
    {
        // Make the new container
        let wrap = document.createElement("div");
        
        // CREATE ELEMENTS ----------------------------------------
        let image = document.createElement("div");
        let names = document.createElement("div");
        let info1 = document.createElement("div");
        let info2 = document.createElement("div");

        //#region  CREATE INFO --------------------------------------------

        // HEADER CODE
        // NAVBAR CODE

        // IMAGE CODE
        let imageString = "";

        if (this.image) 
        {
            imageString += `<img src="${this.image}" alt=""  height = 100px>`;
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

        // INFO2 CODE
        let info2String = "";
        info2String += `<p class = 'details'><strong>Grow Time</strong>: ${this.growTime}</p>`;
        info2String += `<p class = 'details'><strong>Light</strong>: ${this.light}</p>`;
        info2String += `<p class = 'details'><strong>Temperature</strong>: ${this.minTemp}-${this.maxTemp}</p>`;
        info2String += `<p class = 'details'><strong>Humidity</strong>: ${this.humidity}</p>`;
        info2String += `<p class = 'details'><strong>Precipitation</strong>: ${this.minPrecipitation}-${this.maxPrecipitation}</p>`;
        info2String += `<p class = 'details'><strong>Sowing</strong>: ${this.sowing}</p>`;
        info2String += `<p class = 'details'><strong>Soil</strong>: ${this.soil}</p>`;

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
        wrap.classList.add("card");

        // APPEND ELEMENTS (None?) --------------------------------
        wrap.appendChild(image);
        wrap.appendChild(names);
        wrap.appendChild(info1);
        wrap.appendChild(info2);

        return wrap;
    }
}