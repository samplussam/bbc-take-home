import { expect } from "chai";
import "mocha";
import fetch from "node-fetch";

// Scenario 1:
// 1. Make a GET request to the endpoint
// 2. Verify that the HTTP status code of the response is 200
// 3. Verify that the response time of the request is below 1000ms

describe("Scenario 1", () => {
  it("should return 200 and response time below 1000ms", (done) => {
    const startTime = new Date().getTime();
    fetch(
      "https://web-cdn.api.bbci.co.uk/wc-poll-data/container/sport-standings?urn=urn:bbc:sportsdata:rugby-union:tournament:six-nations"
    )
      .then((response) => {
        const endTime = new Date().getTime();
        const responseTime = endTime - startTime;
        expect(response.status).to.equal(200);
        expect(responseTime).to.be.below(1000);
        done();
      })
      .catch((error) => done(error));
  });
});

// Scenario 2:
// 1.Make a GET request to the endpoint
// 2.Verify that the id ﬁeld is never null or empty (“”)
// 3.Verify that there are 6 items returned in the participants array in the response
describe("Scenario 2", () => {
  it("should return valid id and 6 participants", (done) => {
    fetch(
      "https://web-cdn.api.bbci.co.uk/wc-poll-data/container/sport-standings?urn=urn:bbc:sportsdata:rugby-union:tournament:six-nations"
    )
      .then((response) => response.json())
      .then((data) => {
        // Access the relevant section of the response
        const tournament = data.tournaments[0];
        const stage = tournament.stages[0];
        const round = stage.rounds[0];
        const participants = round.participants;

        // Verify that the id is valid and not null or empty
        expect(tournament.id).to.not.be.null.and.to.not.equal("");

        // Verify there are exactly 6 participants in the array
        expect(participants).to.have.lengthOf(6);

        done();
      })
      .catch((error) => done(error));
  });
});

// Scenario 3:
// 1. Make a GET request to the endpoint using a dicerent competition name in the api call
// to replace ‘six-nations’
// 2. Verify that the returned data contains information for that dicerent competition name
describe("Scenario 3", () => {
  it("should return data for a different competition", (done) => {
    fetch(
      "https://web-cdn.api.bbci.co.uk/wc-poll-data/container/sport-standings?urn=urn:bbc:sportsdata:rugby-union:tournament:world-cup"
    )
      .then((response) => response.json())
      .then((data) => {
        expect(data.tournaments).to.exist;
        done();
      })
      .catch((error) => done(error));
  });
});

// Scenario 4:
// 1. Make a GET request to the endpoint with an invalid competition name
// 2. Verify that the returned status code is 404
// 3. Verify that the response body contains an error message

describe("Scenario 4", () => {
  it("should return 404 for invalid competition name", (done) => {
    fetch(
      "https://web-cdn.api.bbci.co.uk/wc-poll-data/container/sport-standings?urn=urn:bbc:sportsdata:rugby-union:tournament:invalid-competition"
    )
      .then((response) => {
        expect(response.status).to.equal(404);
        return response.json();
      })
      .then((data) => {
        expect(data.error).to.exist;
        done();
      })
      .catch((error) => done(error));
  });
});

// Scenario 5:
// In order to isolate traffic driven by the test scenarios from live traffic from the website,
// we want to add a header called x-test-harness=true to each request. However, the
// responses never contain the header.
// Please write a test that proves a GET request has additional headers removed from the
// response.

describe("Scenario 5:", () => {
  it("should not contain x-test-harness header in response", (done) => {
    fetch(
      "https://web-cdn.api.bbci.co.uk/wc-poll-data/container/sport-standings?urn=urn:bbc:sportsdata:rugby-union:tournament:six-nations",
      {
        headers: {
          "x-test-harness": "true",
        },
      }
    )
      .then((response) => {
        expect(response.headers.has("x-test-harness")).to.be.false;
        done();
      })
      .catch((error) => done(error));
  });
});
