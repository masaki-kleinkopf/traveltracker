export default class Trips {
    constructor(tripsData) {
        this.tripsData = tripsData;
    }

    getAllTrips(user) {
       let allTrips = this.tripsData.filter(data => {
            return data.userID === user.id
        })
        let sortedTrips = allTrips.sort((a,b) => {
            const date1 = new Date (a.date)
            const date2 = new Date (b.date)
            return date1 - date2
        })
        return sortedTrips
    }

    getPastTrips(user,date) {
       let allTrips = this.getAllTrips(user)
       return allTrips.filter(trip => {
           let today = new Date (date);
           let tripDate = new Date (trip.date)
           return tripDate < today
       })
    }

    getTotalSpent(user, destinations, date) {
        let allTrips = this.getAllTrips(user)
        let filteredTripsForYear = allTrips.filter(trip => {
            return parseInt(trip.date.split("/")[0]) === parseInt(date.split("/")[0])
        })
        return filteredTripsForYear.reduce((total,data) => {
            destinations.forEach(destination => {
                if (data.destinationID === destination.id){
                    let costPerTrip = (data.duration * destination.estimatedLodgingCostPerDay) + 
                        (data.travelers * destination.estimatedFlightCostPerPerson);
                    total += costPerTrip
                    total += Math.round((costPerTrip * .10))
                };
            })
            return total;
        },0)
    }
}