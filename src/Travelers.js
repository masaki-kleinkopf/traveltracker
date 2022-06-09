export default class Travelers {
    constructor (travelersData) {
        this.travelersData = travelersData;
    }
    
    getRandomTraveler() {
        return this.travelersData[Math.floor(Math.random() * this.travelersData.length)];
    }
}
