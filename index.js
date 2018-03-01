const fs = require('fs');

const input = "data/a_example.in"
const content = fs.readFileSync(input, 'utf8');

const lines = content.split('\n');//.filter((x) => { x != "" });
const firstLine = lines[0];
const flArray = firstLine.split(' ');
console.log(flArray);

const params = {
    R: +flArray[0],
    C: +flArray[1],
    F: +flArray[2],
    N: +flArray[3],
    B: +flArray[4],
    T: +flArray[5],
};

const allRides = [];

for (var i = 1; i <= params.N; i++) {
    const rideArray = lines[i].split(' ');
    const ride = {
        start: {
            x: +rideArray[0],
            y: +rideArray[1]
        },
        end: {
            x: +rideArray[2],
            y: +rideArray[3]
        },
        s: +rideArray[4],
        f: +rideArray[5],
    };
    allRides.push(ride);
}


function distance(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

function durationForRide(ride) {
    return distance(ride.start, ride.end);
}

const origin = { x: 0, y: 0 };

function scoreForRides(rides) {
    let time = 0;
    console.log(rides[0], rides);
    time = distance(origin, rides[0].start);
    let score = 0;
    for (let i = 0; i < rides.length; i++) {
        const currentRide = rides[i];
        if (time < currentRide.s) {
            time = currentRide.s;
        }
        if (time == currentRide.s) {
            score += params.B;
        }
        const duration = durationForRide(currentRide);
        time += duration;
        if (time >= params.T) {
            return score;
        }
        if (time < currentRide.f) {
            score += duration;
        }
    }
    return score;
}





console.log(scoreForRides([allRides[1]]));
