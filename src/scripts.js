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
let userID = 18;
let currentUser;
let currentDate = "2022/06/09"
let userTrips;
let pastUserTrips;
let futureUserTrips;
let pendingUserTrips;
let tripRequestInfo;


const cardDisplay = document.querySelector(".data-display");
const welcomeDisplay = document.querySelector(".welcome")
const costDisplay = document.querySelector(".user-info")
const pastTripsButton = document.querySelector("#past-user-trips");
const allTripsButton = document.querySelector("#all-trips");
const futureTripsButton = document.querySelector("#future-user-trips");
const pendingTrips = document.querySelector("#pending-trips")
const submitButton = document.querySelector("#submit-button");
const quoteButton = document.querySelector("#quote-button")
const startInput = document.querySelector("#start");
const durationInput = document.querySelector("#trip-duration");
const destinationInput = document.querySelector("#trip-destination");
const travelersInput = document.querySelector("#travelers");
const displayTripCost = document.querySelector("#trip-cost");


const createAllData = (data) =>{
    allTravelersData = new Travelers (data[0].travelers);
    currentUser = new Traveler(data[1]);
    allTripsData = new Trips (data[2].trips);
    allDestinationsData = new Destinations (data[3].destinations);
    createUserTrips();
    loadCards(userTrips);
    updateWelcome();
    showTotalSpent();
    addDestinationOptions();
    // createTripRequestInfo();
}

const createUserTrips = () => {
    userTrips = allTripsData.getAllTrips(currentUser);
    pastUserTrips = allTripsData.getPastTrips(userTrips,currentDate);
    futureUserTrips = allTripsData.getFutureTrips(userTrips,currentDate);
    pendingUserTrips = allTripsData.getPendingTrips(userTrips)
}


const fetchData = () => {
    Promise.all([
        getData("travelers"),
        getData("travelers",userID),
        getData("trips"),
        getData("destinations"),
      ]).then(data => {
        createAllData(data)
      })
      .catch((error) =>
      console.log(error, "Error")
    );
}


// this isn't grabbing updated destination
const createTripRequestInfo = () => {
    
    tripRequestInfo ={
        //refactor id
        id: Date.now(),
        userID: currentUser.id,
        destinationID: parseInt(destinationInput[destinationInput.selectedIndex].id),
        travelers: parseInt(travelersInput.value),
        date:startInput.value.split("-").join("/"),
        duration: parseInt(durationInput.value),
        status:'pending',
        suggestedActivities:[]
    };
    console.log('postinfo',tripRequestInfo)
    postNewTrip()
}

const updateDestinationInput = () => {
    tripRequestInfo.destinationID = parseInt(destinationInput[destinationInput.selectedIndex].id)
}

const postNewTrip = () => {
    postData('trips',tripRequestInfo).then((data) => {
        fetchData()
    });
}

const loadCards = (trips) => {
    cardDisplay.innerHTML = ''
    trips.forEach(trip => {
        //refactor to add to Destinations class
        let foundDestination = allDestinationsData.findDestinationByTrip(trip);
        if (trip.status === 'approved'){
            cardDisplay.innerHTML += `
        <div class="widget" id="${trip.id}"> 
            <img src =${foundDestination.image} alt= ${foundDestination.alt}>
            destination: ${foundDestination.destination}<br><br>
            travelers: ${trip.travelers}<br><br>
            date: ${trip.date}
        </div>
        `
        } else {
            cardDisplay.innerHTML += `
        <div class="widget pending" id="${trip.id}"> 
            <img src =${foundDestination.image} alt=${foundDestination.alt}>
            destination: ${foundDestination.destination}<br><br>
            travelers: ${trip.travelers}<br><br>
            date: ${trip.date}<br><br>
            PENDING
        </div>
        `
        }
    })
}

const updateWelcome = () => {
    welcomeDisplay.innerText = `Hi ${currentUser.getFirstName()}`
}

const showTotalSpent = () => {
    costDisplay.innerHTML = `<p>total spent this year: <br><br>${allTripsData.getTotalSpent(userTrips, allDestinationsData, currentDate)}</p>`
}
//refactor
const loadCardOnClick = (event) => {
    if (event.target.id === 'past-user-trips'){
        console.log(event.target.id)
        loadCards(pastUserTrips)
    } 
    if (event.target.id === 'all-trips'){
        console.log(event.target.id)
        loadCards(userTrips)
    } 
    if (event.target.id === 'future-user-trips'){
        console.log(event.target.id)
        loadCards(futureUserTrips)
    } 
    if (event.target.id === 'pending-trips'){
        loadCards(pendingUserTrips)
    }
}

const displayQuote = () => {
    displayTripCost.innerText = `Your quoted price: 
        ${allDestinationsData.findCost(parseInt(durationInput.value),parseInt(travelersInput.value),parseInt(destinationInput[destinationInput.selectedIndex].id))}$`
        displayTripCost.classList.remove("hidden")
}


const addDestinationOptions = () => {
    allDestinationsData.destinationsData.forEach(destination => {
        destinationInput.innerHTML += `
        <option value '${destination.destination}' id=${destination.id}>${destination.destination}</option>`
    })
}


window.addEventListener("load", () => {
    fetchData()
 });


//refactor to add eventListeners with forEach
 pastTripsButton.addEventListener("click", loadCardOnClick);
 allTripsButton.addEventListener("click", loadCardOnClick)
 futureTripsButton.addEventListener("click", loadCardOnClick)
 pendingTrips.addEventListener("click",loadCardOnClick)

 submitButton.addEventListener("click",createTripRequestInfo)
 quoteButton.addEventListener("click",displayQuote)

 startInput.addEventListener("change",updateDestinationInput)


