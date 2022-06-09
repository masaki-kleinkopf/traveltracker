import { expect } from "chai";
import { tripsData, destinationsData, travelersData } from "./testdata.js"
import Travelers from "../src/Travelers.js"

describe("Travelers", () => {
    let travelers;

    beforeEach(() => {
        travelers = new Travelers (travelersData);
    })

    it("should take in travelers data", () => {
        expect(travelers.travelersData).to.deep.equal(travelersData)
    })

    it("should be able to get a random user", () => {
        expect(travelers.getRandomTraveler()).to.be.a("object")
    })
})