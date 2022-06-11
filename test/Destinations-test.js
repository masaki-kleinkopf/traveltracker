import { expect } from "chai";
import { destinationsData } from "./testdata.js"
import Destinations from "../src/Destinations.js"

describe("Travelers", () => {
    let destinations;
    let trip;
    beforeEach(() => {
        destinations = new Destinations (destinationsData);
        trip = {
            "id": 3,
            "userID": 2,
            "destinationID": 2,
            "travelers": 5,
            "date": "2022/10/04",
            "duration": 18,
            "status": "approved",
            "suggestedActivities": []
            }
    })

    it("should take in travelers data", () => {
        expect(destinations.destinationsData).to.deep.equal(destinationsData)
    })

    it("should be able to get a destination by trip", () => {
        let expectedFoundTrip = {
            "id": 2,
            "destination": "Stockholm, Sweden",
            "estimatedLodgingCostPerDay": 100,
            "estimatedFlightCostPerPerson": 780,
            "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            "alt": "city with boats on the water during the day time"
            };

        expect(destinations.findDestinationByTrip(trip)).to.deep.equal(expectedFoundTrip)
    })

    it("should be able to find the cost of a trip with given duration, number of travelers, and destination id", () => {
        expect(destinations.findCost(2,2,1)).to.equal(1034)
    })
})