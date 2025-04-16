import { expect } from "chai";
import "mocha";
import fetch from "node-fetch";

// Work out response time by comparing start and end time, and then verify that is is below 1000ms and status code is 200
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

// Check that the response contains a valid id and 6 participants
describe("Scenario 2", () => {
  it("should return valid id and 6 participants", (done) => {
    fetch(
      "https://web-cdn.api.bbci.co.uk/wc-poll-data/container/sport-standings?urn=urn:bbc:sportsdata:rugby-union:tournament:six-nations"
    )
      .then((response) => response.json())
      .then((data) => {
        // Participants is nested, so need to extract it first
        const tournament = data.tournaments[0];
        const stage = tournament.stages[0];
        const round = stage.rounds[0];
        const participants = round.participants;
        expect(tournament.id).to.not.be.null.and.to.not.equal("");
        expect(participants).to.have.lengthOf(6);

        done();
      })
      .catch((error) => done(error));
  });
});

// Check that the response contains data for a different competition
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

// Check that the response returns 404 for an invalid competition name
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

// Check that the response does not contain x-test-harness header
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
