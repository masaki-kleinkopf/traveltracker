import { expect } from "chai";
import { travelersData } from "./testdata.js"
import Travelers from "../src/Travelers.js"

describe("Travelers", () => {
    let travelers;

    beforeEach(() => {
        travelers = new Travelers (travelersData);
    });

    it("should take in travelers data", () => {
        expect(travelers.travelersData).to.deep.equal(travelersData)
    });
});