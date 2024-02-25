//"use strict";

// Define the base URL for the Plant API
const PLANTAPI_URL = "https://trefle.io";

const token = "token=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozNDY1LCJvcmlnaW4iOiJodHRwczovL2FyaWVsbm90b3Jlby5naXRodWIuaW8vYmxvb20tYnVkZHkvIiwiaXAiOm51bGwsImV4cGlyZSI6IjIwMjQtMDItMjYgMDc6NTQ6MTYgKzAwMDAiLCJleHAiOjE3MDg5MzQwNTZ9._L3Q18J_xVXGUjyvs6KvD3BucX7ZhhoEDmQAbrMvDCs";
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
    // obj[i].whatever
    for (let i = 0; i < 30; i++) 
    {
        let url = PLANTAPI_URL + obj.links.plant + "?" + token;
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
        obj.growth.description,
        obj.main_species.edible,
        obj.main_species.edible_part,
        obj.specifications.average_height.cm,
        obj.growth.days_to_harvest,
        obj.growth.sowing,
        obj.growth.light,
        obj.growth.atmospheric_humidity,
        obj.growth.minimum_temperature.deg_c,
        obj.growth.maximum_temperature.deg_c,
        obj.growth.spread.cm,
        obj.growth.minimum_precipitation.mm,
        obj.growth.maximum_precipitation.mm,
        obj.growth.soil_nutriements,
        obj.main_species.distribution.native
        );
    let card = document.createElement("div");
    card.innerHTML = plantCard.card;
    card.classList.add("card");
    document.querySelector("#moreBtn").onclick = moreClick(plantCard);

    let content = document.querySelector("#content");
    content.appendChild(card);

}

function moreClick(plantCard)
{
    window.location.href = plantCard.makePage();
}