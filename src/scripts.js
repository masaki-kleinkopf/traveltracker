// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import { getData, postData } from "./apiCalls.js";
import Trips from "../src/Trips.js"

let allTravelersData;
let singleTravelerData;
let allTripsData;
let allDestinationsData;
let userId = 2
let currentDate;
let userTrips;

const cardDisplay = document.querySelector(".data-display");

const createAllData = (data) =>{
    allTravelersData = data[0].travelers;
    singleTravelerData = data[1];
    allTripsData = new Trips (data[2].trips);
    allDestinationsData = data[3].destinations;

    createUserTrips();
}

const createUserTrips = () => {
    userTrips = allTripsData.getAllTrips(singleTravelerData)
    console.log(userTrips)
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
        loadCards()
      })
      .catch((error) =>
      console.log(error, "Error")
    );
}

const loadCards = () => {
    cardDisplay.innerHTML = ''
    userTrips.forEach(trip => {
        let foundDestination = allDestinationsData.find(destination => {
            return destination.id === trip.destinationID
        })
        cardDisplay.innerHTML += `
        <div class="widget" id="${trip.id}"> 
            destination: ${foundDestination.destination}<br><br>
            travelers: ${trip.travelers}<br><br>
            date: ${trip.date}
        </div>
        `
    })
}


window.addEventListener("load", () => {
    fetchData()

 });
