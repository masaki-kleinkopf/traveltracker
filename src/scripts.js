// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import { getData, postData } from "./apiCalls.js";

let allTravelersData;
let singleTravelerData;
let allTripsData;
let allDestinationsData;
let userId = 1
let currentDate;

const createAllData = (data) =>{
    allTravelersData = data[0].travelers;
    singleTravelerData = data[1];
    allTripsData = data[2].trips;
    allDestinationsData = data[3].trips;
}

const fetchData = () => {
    Promise.all([
        getData("travelers"),
        getData("travelers",userId),
        getData("trips"),
        getData("destinations"),
      ]).then(data => {
          console.log(data)
        createAllData(data)
      })
      .catch((error) =>
      console.log(error, "Error")
    );
}


window.addEventListener("load", () => {
    fetchData()

 });
