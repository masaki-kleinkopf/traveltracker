export default class Trips {
    constructor(tripsData) {
        this.tripsData = tripsData;
    }

    getAllTrips(user) {
       return this.tripsData.filter(data => {
            return data.userID === user.id
        })
    }

    getTotalSpent(user,destinations) {
        let allTrips = this.getAllTrips(user)
        return allTrips.reduce((total,data) => {
            destinations.forEach(destination => {
                if (data.destinationID === destination.id){
                   let costPerTrip = (data.duration * destination.estimatedLodgingCostPerDay) + 
                    (data.travelers * destination.estimatedFlightCostPerPerson)
                   total += costPerTrip
                }
            })
            return total
        },0)
    }
}