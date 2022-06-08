import { expect } from "chai";
import { tripsData, destinationsData } from "./testdata.js"
import Trips from "../src/Trips.js"


describe("Trips", () => {
    let trips;
    let destinations;
    let currentUser;

    beforeEach(() => {
        trips = new Trips (tripsData);
        destinations = destinationsData;
        currentUser = {id: 1, name: 'Ham Leadbeater', travelerType: 'relaxer'}
    })

    it("should take in trips data", () => {
        expect(trips.tripsData).to.deep.equal(tripsData)
    })

    it("should get all trips for a user", () => {
         expect(trips.getAllTrips(currentUser)).to.deep.equal([
            {
                "id": 1,
                "userID": 1,
                "destinationID": 1,
                "travelers": 1,
                "date": "2022/09/16",
                "duration": 8,
                "status": "approved",
                "suggestedActivities": []
                },
                {
                    "id": 4,
                    "userID": 1,
                    "destinationID": 3,
                    "travelers": 1,
                    "date": "2022/09/17",
                    "duration": 8,
                    "status": "approved",
                    "suggestedActivities": []
                    },
                    {
                    "id": 5,
                    "userID": 1,
                    "destinationID": 5,
                    "travelers": 5,
                    "date": "2022/10/05",
                    "duration": 18,
                    "status": "approved",
                    "suggestedActivities": []
                    }
        ])
    })

    it("should get the total spent for all trips", () => {
        expect(trips.getTotalSpent(currentUser, destinations)).to.deep.equal(0)
    })
})