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

    getPastTrips(userTrips,date) {
    //    let allTrips = this.getAllTrips(user)
       return userTrips.filter(trip => {
           let today = new Date (date);
           let tripDate = new Date (trip.date)
           return tripDate < today
       })
    }

    getFutureTrips(userTrips,date) {
        // let userTrips = this.getAllTrips(user)
        return userTrips.filter(trip => {
           let today = new Date (date);
           let tripDate = new Date (trip.date)
           return tripDate > today
       })
    }

    getPendingTrips(userTrips){
        let pendingTrips = userTrips.filter(trip => {
           return trip.status === "pending"
        })
        if (!pendingTrips) {
            return false;
        } else {
            return pendingTrips;
        }
    }

    getTotalSpent(userTrips, destinations, date) {
        let filteredTripsForYear = userTrips.filter(trip => {
            return parseInt(trip.date.split("/")[0]) === parseInt(date.split("/")[0])
        })
        return filteredTripsForYear.reduce((total,data) => {
            destinations.destinationsData.forEach(destination => {
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