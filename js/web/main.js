"use strict";

// Define the base URL for the Plant API
const PLANTAPI_URL = "https://trefle.io";

const token = "token=mJ0zOEvk8QqpnK5eijOVBWJPi09uU6XZyz2acO3L7rs";
let pageIndex = 1;

// Execute when the window has loaded
window.onload = function(e) 
{
    let url = PLANTAPI_URL + "/api/v1/plants/search?" + token + "&page=" + pageIndex;
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

    // still need to fill in constructor
    // obj[i].whatever
    let plantCard = new Plant();
}