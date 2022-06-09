// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import { getData, postData } from "./apiCalls.js";
import Trips from "../src/Trips.js"
import Travelers from "../src/Travelers.js"
import Traveler from "../src/Traveler.js"
import Destinations from "../src/Destinations.js"

let allTravelersData;
let allTripsData;
let allDestinationsData;
let currentUser;
let currentDate = "2022/06/09"
let userTrips;

const cardDisplay = document.querySelector(".data-display");
const welcomeDisplay = document.querySelector(".welcome")
const costDisplay = document.querySelector(".user-info")

const fetchCurrentUser = () => {
    getData("travelers", allTravelersData.getRandomTraveler().id)
        .then(data => {
            currentUser = new Traveler (data)
            createUserTrips();
            loadCards();
            updateWelcome();
            showTotalSpent();
        })
}

const createAllData = (data) =>{
    allTravelersData = new Travelers (data[0].travelers);
    allTripsData = new Trips (data[1].trips);
    allDestinationsData = new Destinations (data[2].destinations);
    console.log('allDestinations',allDestinationsData)
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
        let foundDestination = allDestinationsData.findDestinationByTrip(trip);
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

const updateWelcome = () => {
    welcomeDisplay.innerText = `Hi ${currentUser.getFirstName()}`
}

const showTotalSpent = () => {
    costDisplay.innerHTML = `<p>total spent this year: <br><br>${allTripsData.getTotalSpent(userTrips, allDestinationsData, currentDate)}</p>`
    console.log("user",currentUser)
    console.log("destinations",currentUser)
    console.log("date", currentDate)
}

window.addEventListener("load", () => {
    fetchData()
 });

