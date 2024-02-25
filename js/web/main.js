"use strict";

// Define the base URL for the Plant API
const PLANTAPI_URL = "https://trefle.io";

const token = "token=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozNDY1LCJvcmlnaW4iOiJodHRwczovL2FyaWVsbm90b3Jlby5naXRodWIuaW8iLCJpcCI6bnVsbCwiZXhwaXJlIjoiMjAyNC0wMi0yNiAwODoxMzoyOSArMDAwMCIsImV4cCI6MTcwODkzNTIwOX0.pC2cNpbBFoUot8GUu4mywpPBRm_6u6JJa_Xc2eI1Izw";
let pageIndex = 1;

// Execute when the window has loaded
window.onload = function(e) 
{
    let url = PLANTAPI_URL + "/api/v1/plants?" + token + "&page=" + pageIndex;
    getSpecies(url);
}

function getSpecies(url, index) 
{
    let xhr = new XMLHttpRequest();
    xhr.onload = function (e) {
        speciesLoaded(e, index);
    };

    xhr.onerror = function () {
        dataError("Failed to make a request to " + url);
    };

    xhr.open("GET", url);
    xhr.send();
}

function speciesLoaded(e, index) 
{
    let xhr = e.target;
    let obj;
    try {
        obj = JSON.parse(xhr.responseText).data;
    } catch (error) {
        dataError();
        return;
    }

    // still need to fill in constructor
    // WHY IS IT NOT UPDATING
    for (let i = 0; i < 20; i++) 
    {
        let url = PLANTAPI_URL + obj[i].links.plant + "?" + token;
        getPlant(url)
    }
}

function getPlant(url, index) 
{
    let xhr = new XMLHttpRequest();
    xhr.onload = function (e) {
        plantLoaded(e, index);
    };

    xhr.onerror = function () {
        dataError("Failed to make a request to " + url);
    };

    xhr.open("GET", url);
    xhr.send();
}

function plantLoaded(e, index) 
{
    let xhr = e.target;
    let obj;
    try {
        obj = JSON.parse(xhr.responseText).data;
    } catch (error) {
        dataError();
        return;
    }

    let plantCard = new Plant(
        obj.common_name, 
        obj.scientific_name,
        obj.image_url,
        obj.family_common_name,
        obj.main_species.duration,
        obj.main_species.growth.description,
        obj.main_species.edible,
        obj.main_species.edible_part,
        obj.main_species.specifications.average_height.cm,
        obj.main_species.growth.days_to_harvest,
        obj.main_species.growth.sowing,
        obj.main_species.growth.light,
        obj.main_species.growth.atmospheric_humidity,
        obj.main_species.growth.minimum_temperature.deg_c,
        obj.main_species.growth.maximum_temperature.deg_c,
        obj.main_species.growth.spread.cm,
        obj.main_species.growth.minimum_precipitation.mm,
        obj.main_species.growth.maximum_precipitation.mm,
        obj.main_species.growth.soil_nutriements,
        obj.main_species.distribution.native
        );
    plantCard.makeCard();   // did i break it?
    let card = document.createElement("div");
    card.innerHTML = plantCard.card;
    card.classList.add("card");
    let content = document.querySelector("#content");
    content.appendChild(card);

    document.querySelector("#moreBtn").onclick = moreClick(plantCard);

}

function moreClick(plantCard)
{
    let old = document.getElementById("#card");
    let content = document.querySelector("#content");
    content.replaceChild(plantCard.makePage(), old);
}