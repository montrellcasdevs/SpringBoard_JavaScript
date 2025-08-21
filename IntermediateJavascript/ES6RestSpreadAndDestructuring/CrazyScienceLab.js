//Task 1. Compile Participant Details with Shorthand Property Names:
const participant = { name, age, studyField };

const participantWMethod = { 
    name, 
    age, 
    studyField,
    //Task 2 - Implement a Shorthand Function for Participant Info:
    displayInfo: () => {
        return `Name: ${this.name}, Age: ${this.age}, Study Field: ${this.studyField}`;
    }
};

participantWMethod.displayInfo();

//Task 3 Implement a Same Shorthand Arrow Function for Participant Info:

const participantWArrowFunction = { 
    ...participant,
    displayInfo: () => `Name: ${this.name}, Age: ${this.age}, Study Field: ${this.studyField}`
};

console.log(participantWArrowFunction.displayInfo()); // All values will be undefined

//Task 4 Using Computed Property Names
function updateParticipantInfo(obj, propName, value) {
  return { ...obj, [propName]: value }; //return object, string, and value
}

// Calling Function with Arguments:
const updated = updateParticipantInfo(participant, "age", 30);
console.log(updated);