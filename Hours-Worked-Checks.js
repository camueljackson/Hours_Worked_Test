// Just looking to terminate the function as soon as a day with less than 10hrs of rest is found. 
function dailyHoursRest(array) {
    for (day of array) {
        if (day.hours_rest < 10) {
          console.log('Not enough sleep');
          return;
        } 
    }
}

function leastHoursOff(array, result = [], index = 0) {
    // Slicing array in increments of 7
    let slicedArray = array.slice(index, index + 7);
    // Base case (terminal case?), where as soon as there are fewer than 7 days, return the result array. 
    if (slicedArray.length < 7) {
        return result;        
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // Adding up the values of the 7-day increment arrays, returns a single number for the total.
    let reducedArray = slicedArray.reduce(reducer);
    // newResult speards the 'result' array with the 'reducedArray' number (which gives the return value of this function).
    const newResult = [...result, reducedArray];
    // Increase index to move on to next chunk of days.
    const newIndex = index + 1;
    // return the value of this function.
    return leastHoursOff(array, newResult, newIndex);
}

let workDayDetails = [
    //Oct 10, 12am-4am; 12pm-4pm
    {
        "_id": "0122b58e5dbbe4b",
        "type": "hours_worked",
        "status": "complete",
        "uid": "u12345",
        "hours": [
            { "start": 1539129600, "end": 1539144000 },
            { "start": 1539172800, "end": 1539187200 }
        ],
        "timestamp": 1539129600, /* Day Worked */
        "hours_rest": 16 /* Hours of Rest */
    },
    
    //Oct 11, 6-12; 12-4
    {
        "_id": "0123b58e5dbbe4b",
        "type": "hours_worked",
        "status": "complete",
        "uid": "u12346",
        "hours": [
            { "start": 1539237600, "end": 1539259200 },
            { "start": 1539259200, "end": 1539273600 }
        ],
        "timestamp": 1539216000,
        "hours_rest": 14
    },
    
    //Oct 12, 5am-10am; 4pm-10pm
    {
        "_id": "0124b58e5dbbe4b",
        "type": "hours_worked",
        "status": "complete",
        "uid": "u12347",
        "hours": [
            { "start": 1539320400, "end": 1539338400 },
            { "start": 1539360000, "end": 1539381600 }
        ],
        "timestamp": 1539302400,
        "hours_rest": 13
    },
    
    //Oct 13, 12am-6am, 18-23:59
    {
        "_id": "0125b58e5dbbe4b",
        "type": "hours_worked",
        "status": "complete",
        "uid": "u12348",
        "hours": [
            { "start": 1539388800, "end": 1539410400 },
            { "start": 1539453600, "end": 1539475140 }
        ],
        "timestamp": 1539388800,
        "hours_rest": 12
    },
    
    //Oct 14, 4am-12pm, 18-22:00
    {
        "_id": "0126b58e5dbbe4b",
        "type": "hours_worked",
        "status": "complete",
        "uid": "u1239",
        "hours": [
            { "start": 1539489600, "end": 1539518400 },
            { "start": 1539540000, "end": 1539554400 }
        ],
        "timestamp": 1539475200,
        "hours_rest": 12
    },
    
    //Oct 15, 06-14, 18-23:59
    {
        "_id": "0127b58e5dbbe4b",
        "type": "hours_worked",
        "status": "complete",
        "uid": "u1240",
        "hours": [
            { "start": 1539583200, "end": 1539612000 },
            { "start": 1539626400, "end": 1539647940 }
        ],
        "timestamp": 1539561600,
        "hours_rest": 10
    },
    
    //Oct 16, 00-12, 15-19
    {
        "_id": "0128b58e5dbbe4b",
        "type": "hours_worked",
        "status": "complete",
        "uid": "u1241",
        "hours": [
            { "start": 1539648000, "end": 1539691200 },
            { "start": 1539702000, "end": 1539716400 }
        ],
        "timestamp": 1539648000,
        "hours_rest": 8
    },
    //Oct 17, 00-6am, 12-18
    {
        "_id": "0128b58e5dbbe4b",
        "type": "hours_worked",
        "status": "complete",
        "uid": "u1241",
        "hours": [
            { "start": 1539734400, "end": 1539756000 },
            { "start": 1539777600, "end": 1539799200 }
        ],
        "timestamp": 1539734400,
        "hours_rest": 12
    },
    //Oct 18, 00-10am, 12-18
    {
        "_id": "0128b58e5dbbe4b",
        "type": "hours_worked",
        "status": "complete",
        "uid": "u1241",
        "hours": [
            { "start": 1539820800, "end": 1539856800 },
            { "start": 1539864000, "end": 1539885600 }
        ],
        "timestamp": 1539820800,
        "hours_rest": 8
    },
    
]

// Create array of hours_rest, instead of having to move through the object in functions. 
const workDayHours = workDayDetails.map( (item) =>  item.hours_rest);

// Value returned from 'leastHoursOff' Function, array containing the total hours_rest per 7-day increment. 
let result = leastHoursOff(workDayHours);
// Finds the lowest value of this array (have to spead array because Math.min expects numbers)
let minimum = Math.min(...result);

dailyHoursRest(workDayDetails)
console.log('Shortest number of hours_rest per 7-day period: ', minimum)