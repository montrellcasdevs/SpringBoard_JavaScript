
// This function simulates a mystery operation that can succeed or fail
function mysteryOperation(operation) {
     vacation = 0;
     motivation = 1;
     // Attendance days are calculated based on vacation and motivation
     attendance = vacation || motivation + 3;
    try {
        // Check if the operation is a number
        if (isNaN(operation)) {
            throw "Operation Fails";

        } else {
            // If the operation is successful
            console.log("Operation Succeeded");
            // Add vacation days
            vacation += 13;
        }
        // Motivation days are earned based on the operation's outcome
        motivation += (operation > 10) ? 5 : 2;
    } catch (e) {
        // If an error occurs, log the error and add failure days
        console.error(e);
        // Add failure days
        vacation += 1;
    } finally {
        // Always add attendance days
        attendance = vacation || motivation + 3;
        // Output the total attendance days
        console.log("Done " + attendance);
    }
}
//mysteryOperation("a");
mysteryOperation(20);