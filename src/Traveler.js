export default class Traveler {
    constructor(traveler) {
        this.id = traveler.id;
        this.name = traveler.name;
        this.type = traveler.type;
    }
    getFirstName() {
        return this.name.split(' ')[0]
    }
}