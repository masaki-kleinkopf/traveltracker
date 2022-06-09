import { expect } from "chai";
import { travelersData } from "./testdata.js"
import Traveler from "../src/Traveler.js"

describe("Travelers", () => {
    let traveler;
    let traveler2;

    beforeEach(() => {
        traveler = new Traveler (travelersData[0]);
        traveler2 = new Traveler (travelersData[1])
    })

    it('should take in a traveler', () => {
        expect(traveler).to.be.an.instanceOf(Traveler)
    })

    it('should return a first name', () => {
        expect(traveler.getFirstName()).to.equal('Ham')
        expect(traveler2.getFirstName()).to.equal('Rachael')
    })
})