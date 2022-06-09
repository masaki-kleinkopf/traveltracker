export default class Destinations {
    constructor(destinationsData) {
        this.destinationsData = destinationsData;
    }
    
    findDestinationByTrip(trip) {
       return this.destinationsData.find(destinationData => {
           return destinationData.id === trip.destinationID;
        })
    }
}