export default class Destinations {
    constructor(destinationsData) {
        this.destinationsData = destinationsData;
    }

    findDestinationByTrip(trip) {
       return this.destinationsData.find(destinationData => {
           return destinationData.id === trip.destinationID;
        })
    }

    findCost(duration, numTravelers, id) {
        let foundDestination = this.destinationsData.find(destination => {
            return id === id;
        })
        let costPerTrip = (duration * foundDestination.estimatedLodgingCostPerDay) + 
             (numTravelers * foundDestination.estimatedFlightCostPerPerson)
        return costPerTrip += Math.round((costPerTrip * .1))
    }
}