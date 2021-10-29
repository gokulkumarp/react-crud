function SeatingStudents(arr) {
    const number_of_seats = arr.shift();
    const number_of_rows = Math.round(number_of_seats / 2);
    const seat = [];
    let idx = 0;
    for (row = 0; row < number_of_rows; row ++) {
        seat.push([]);
        for (col = 0; col < 2; col ++) {
            const isOccupied = arr.indexOf(idx + 1) > -1 ? true : false;
            //console.log(row);
            seat[row].push(isOccupied);
            idx ++;
        }
        console.log(seat[row].join("-"));
    }

    let seating = 0;
    for (let i = 0; i < number_of_rows - 1; i ++) {
        if ((seat[i][0] === false) && (seat[i][1] === false)) seating ++;
        if ((seat[i][0] === false) && (seat[i + 1][0] === false)) seating ++;
        if ((seat[i][1] === false) && (seat[i + 1][1] === false)) seating ++;
    }
    // check if last row is empty:
    if ((seat[number_of_rows - 1][0] == false) && (seat[number_of_rows - 1][1] == false)) seating ++;
    return seating;
}

const input = [12, 2, 6, 7, 11];
//const input = [8,1,8];

console.log(SeatingStudents(input));