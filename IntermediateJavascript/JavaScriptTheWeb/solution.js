//Task1
const myElement = document.getElementById('task1').innerText = "Changed using 'innerText'.";


//Task2
const taskTwo = document.getElementById('task2').innerHTML = "<button>Submit</button>";
//taskTwo.testTask2();

//Task3
const bgCol = document.body.style.backgroundColor = 'rgb(35, 35, 35)';
//bgCol.testTask3();

//Task4
// Get all elements with the class 'item'
    const items = document.querySelectorAll('.item');

    const result = items.forEach(item => {
      item.style.border = '2px solid blue'; // Example: 2px solid blue border
    });
//result.testTask4();

//Task5
const link = document.getElementById("task5")
link.href = 'https://www.springboard.com/'; //dig down to the href property
//link.href.testTask5();

//Task6
let inputElement = document.getElementById('task6'); //drill down close to it

// Change the value of the input element
inputElement.value = 'DOM Master'; //Then choose the element property
//inputElement.testTask6();

//Task7
const newElement = document.getElementById('task7');

newElement.classList.add('new-class');
//newElement.testTask7();

//Task 8
const newButton = document.createElement('button'); //Create a new button
newButton.textContent = 'BUTTON'; //Change text on new button
const under_Task8 = document.getElementById('task8'); //getting the spot here the button will go
under_Task8.appendChild(newButton); // Append the new button to the designated spot
//newButton.testTask8();

//Task 9
const elementToRemove = document.getElementById('task9'); //Choose what element needs to be removed
    if (elementToRemove) {
        elementToRemove.remove(); //call the remove method to remove the element
    }
elementToRemove.testTask9();
