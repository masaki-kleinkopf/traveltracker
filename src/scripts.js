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
let userID;
let currentUser;
let currentDate;
let userTrips;
let pastUserTrips;
let futureUserTrips;
let pendingUserTrips;
let currentUserTrips;
let tripRequestInfo;


const cardDisplay = document.querySelector(".data-display");
const welcomeDisplay = document.querySelector(".welcome")
const costDisplay = document.querySelector(".user-info")
const submitButton = document.querySelector("#submit-button");
const quoteButton = document.querySelector("#quote-button")
const startInput = document.querySelector("#start");
const durationInput = document.querySelector("#trip-duration");
const destinationInput = document.querySelector("#trip-destination");
const travelersInput = document.querySelector("#travelers");
const displayTripCost = document.querySelector("#trip-cost");
const form = document.querySelector(".user-form");
const usernameInput = document.querySelector("#username-input");
const passwordInput = document.querySelector("#password-input");
const loginButton = document.querySelector("#login-submit");
const mainDisplay = document.querySelector(".main-display");
const signIn = document.querySelector(".sign-in-container");
const logInErrorMessage = document.querySelector("#login-error-message");
const displayButtons = Array.from(document.querySelectorAll(".display-button"));
const submitErrorMessage = document.querySelector("#submit-error-message")
const submitSuccessfulMessage = document.querySelector("#submit-success-message")

const populateData = (data) => {
    allTravelersData = new Travelers (data[0].travelers);
    currentUser = new Traveler(data[1]);
    allTripsData = new Trips (data[2].trips);
    allDestinationsData = new Destinations (data[3].destinations);
};

const createAllData = (data) =>{
    setTodaysDate();
    populateData(data);
    createUserTrips();
    loadCards(userTrips);
    updateWelcome();
    showTotalSpent();
    addDestinationOptions();
};

const createUserTrips = () => {
    userTrips = allTripsData.getAllTrips(currentUser);
    pastUserTrips = allTripsData.getPastTrips(currentUser,currentDate);
    futureUserTrips = allTripsData.getFutureTrips(currentUser,currentDate);
    pendingUserTrips = allTripsData.getPendingTrips(currentUser);
    currentUserTrips = allTripsData.getCurrentTrips(currentUser,currentDate);
};

const fetchData = () => {
    Promise.all([
        getData("travelers"),
        getData("travelers",userID),
        getData("trips"),
        getData("destinations"),
      ]).then(data => {
        createAllData(data);
      })
      .catch((error) =>
      console.log(error, "Error")
    );
};

const createTripRequestInfo = () => {
    tripRequestInfo ={
        id: (allTripsData.tripsData.length + 1),
        userID: currentUser.id,
        destinationID: parseInt(destinationInput[destinationInput.selectedIndex].id),
        travelers: parseInt(travelersInput.value),
        date:startInput.value.split("-").join("/"),
        duration: parseInt(durationInput.value),
        status:'pending',
        suggestedActivities:[]
    };
    form.reset();
    postNewTrip();
};

const postNewTrip = () => {
    postData('trips',tripRequestInfo).then(() => {
        fetchData();
    });
};

const loadCards = (trips) => {
    cardDisplay.innerHTML = ''
    trips.forEach(trip => {
        let foundDestination = allDestinationsData.findDestinationByTrip(trip);
        if (trip.status === 'approved'){
            cardDisplay.innerHTML += `
        <div class="widget" id="${trip.id}"> 
            <img src =${foundDestination.image} alt= ${foundDestination.alt}>
            destination: ${foundDestination.destination}<br>
            travelers: ${trip.travelers}<br>
            days: ${trip.duration}<br>
            date: ${trip.date}
        </div>
        `
        } else {
            cardDisplay.innerHTML += `
        <div class="widget pending" id="${trip.id}"> 
            <img src =${foundDestination.image} alt=${foundDestination.alt}>
            destination: ${foundDestination.destination}<br>
            travelers: ${trip.travelers}<br>
            days: ${trip.duration}<br>
            date: ${trip.date}<br>
            PENDING
        </div>
        `
        };
    });
};

const getTodaysDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return yyyy + '/' + mm + '/' + dd;
  };

const setTodaysDate = () => {
    currentDate = getTodaysDate();
    let isoDate = currentDate.split('/').join('-');
    startInput.setAttribute('min', isoDate);
};

const updateWelcome = () => {
    welcomeDisplay.innerText = `Hi ${currentUser.getFirstName()}`
};

const showTotalSpent = () => {
    costDisplay.innerHTML = `<p>total spent this year: <br><br>${allTripsData.getTotalSpent(currentUser, allDestinationsData, currentDate)}$</p>`
};

const loadCardOnClick = (event) => {
    if (event.target.id === 'past-user-trips'){
        loadCards(pastUserTrips);
    };
    if (event.target.id === 'all-trips'){
        loadCards(userTrips);
    }; 
    if (event.target.id === 'future-user-trips'){
        loadCards(futureUserTrips);
    }; 
    if (event.target.id === 'pending-trips'){
        loadCards(pendingUserTrips);
    };
    if (event.target.id === 'present-trips'){
        loadCards(currentUserTrips);
    };
};

const displayQuote = () => {
    const duration = parseInt(durationInput.value);
    const numTravelers = parseInt(travelersInput.value);
    const destinationId = parseInt(destinationInput[destinationInput.selectedIndex].id);
    displayTripCost.innerText = `Your quoted price: 
        ${allDestinationsData.findCost(duration,numTravelers,destinationId)}$`;
        displayTripCost.classList.remove("hidden");
};

const addDestinationOptions = () => {
    allDestinationsData.destinationsData.forEach(destination => {
        destinationInput.innerHTML += `
        <option value '${destination.destination}' id=${destination.id}>${destination.destination}</option>`
    });
};

const evaluateLogin = (event) => {
    event.preventDefault()
    const username = usernameInput.value;
    const password = passwordInput.value;
    const splitUsername = username.split('');
    const usernameWord = splitUsername.slice(0,8).join('');
    const usernameNumber = parseInt(splitUsername.slice(8,10).join(''));
    if (usernameWord === "traveler" && password === "traveler" && typeof usernameNumber === "number" && usernameNumber > 0 && usernameNumber < 51){
        signIn.classList.add("hidden");
        mainDisplay.classList.remove("hidden");
        userID = parseInt(usernameNumber);
        fetchData();
    } else {
        logInErrorMessage.classList.remove("hidden")
    };
};

displayButtons.forEach(button => {
    button.addEventListener("click", loadCardOnClick);
});
 submitButton.addEventListener("click",createTripRequestInfo);
 quoteButton.addEventListener("click",displayQuote);
 loginButton.addEventListener("click", evaluateLogin);

export { submitErrorMessage, submitSuccessfulMessage}


