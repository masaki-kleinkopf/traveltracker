// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import { getData, postData } from "./apiCalls.js";
import Trips from "../src/Trips.js"
import Travelers from "../src/Travelers.js"

let allTravelersData;
let allTripsData;
let allDestinationsData;
let currentUser;
let currentDate;
let userTrips;

const cardDisplay = document.querySelector(".data-display");

const fetchCurrentUser = () => {
    getData("travelers", allTravelersData.getRandomTraveler().id)
        .then(data => {
            currentUser = data
            createUserTrips();
            loadCards();
        })
}

const createAllData = (data) =>{
    allTravelersData = new Travelers (data[0].travelers);
    allTripsData = new Trips (data[1].trips);
    allDestinationsData = data[2].destinations;
    fetchCurrentUser()
}

const createUserTrips = () => {
    userTrips = allTripsData.getAllTrips(currentUser)
    console.log(userTrips)
}



const fetchData = () => {
    Promise.all([
        getData("travelers"),
        getData("trips"),
        getData("destinations"),
      ]).then(data => {
        createAllData(data)
      })
      .catch((error) =>
      console.log(error, "Error")
    );
}

const loadCards = () => {
    cardDisplay.innerHTML = ''
    userTrips.forEach(trip => {
        //refactor to add to Destinations class
        let foundDestination = allDestinationsData.find(destination => {
            return destination.id === trip.destinationID
        })
        cardDisplay.innerHTML += `
        <div class="widget" id="${trip.id}"> 
            <img src =${foundDestination.image}>
            destination: ${foundDestination.destination}<br><br>
            travelers: ${trip.travelers}<br><br>
            date: ${trip.date}
        </div>
        `
    })
}

// const updateWelcome = () => {

// }


window.addEventListener("load", () => {
    fetchData()
 });
