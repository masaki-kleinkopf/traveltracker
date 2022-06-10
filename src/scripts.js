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
let userID = 22;
let currentUser;
let currentDate = "2022/06/09"
let userTrips;
let pastUserTrips;
let futureUserTrips;
let tripRequestInfo;


const cardDisplay = document.querySelector(".data-display");
const welcomeDisplay = document.querySelector(".welcome")
const costDisplay = document.querySelector(".user-info")
const pastTripsButton = document.querySelector("#past-user-trips");
const allTripsButton = document.querySelector("#all-trips");
const futureTripsButton = document.querySelector("#future-user-trips");
const submitButton = document.querySelector("#submit-button")
const startInput = document.querySelector("#start");
const durationInput = document.querySelector("#trip-duration");
const destinationInput = document.querySelector("#trip-destination");
const travelersInput = document.querySelector("#travelers");


const createAllData = (data) =>{
    allTravelersData = new Travelers (data[0].travelers);
    currentUser = new Traveler(data[1])
    console.log(currentUser)
    allTripsData = new Trips (data[2].trips);
    allDestinationsData = new Destinations (data[3].destinations);
    console.log(allDestinationsData)
    console.log('allDestinations',allDestinationsData)
    createUserTrips();
    loadCards(userTrips);
    updateWelcome();
    showTotalSpent();
    addDestinationOptions();
    // createTripRequestInfo();
}

const createUserTrips = () => {
    userTrips = allTripsData.getAllTrips(currentUser)
    pastUserTrips = allTripsData.getPastTrips(userTrips,currentDate)
    futureUserTrips = allTripsData.getFutureTrips(userTrips,currentDate)
    console.log(pastUserTrips)
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

const postNewTrip = () => {
    postData('trips',tripRequestInfo).then((data) => {
        fetchData()
    }
    )
}

const loadCards = (trips) => {
    cardDisplay.innerHTML = ''
    trips.forEach(trip => {
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

 submitButton.addEventListener("click",createTripRequestInfo)


