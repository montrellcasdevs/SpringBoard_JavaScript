// go to the spoonacular api, get random recipe //
// click a button ad display that recipe //
// the browser needs to display it //
////////////////(5 & 6)Spoonacular API
const spoonacularAPIKEY = 'b0afa02ef5e646848b8e3cc9f8b72f5b';

const button = document.getElementById("generate-button");
const displayDiv = document.getElementById('display-div');

console.log(button); //typeof button is object Identifying the button
button.addEventListener('click', () => {
    console.log("Button clicked"); // testing if the button clicks from the button
    getRandomRecipe();
});
async function getRandomRecipe() {

    //Create a new div
    let newRecipeDiv = document.createElement('div');
    let h3 = document.createElement('h3');

    try{
    const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${spoonacularAPIKEY}`);
    console.log(response);
    displayDiv.innerHTML = ''; // Clear previous content
    
    //set title into the header
    h3.innerText = response.data.recipes[0].title;
    displayDiv.appendChild(h3);

    //set the recipe summary in new div
   newRecipeDiv.innerHTML = response.data.recipes[0].summary;
   displayDiv.appendChild(newRecipeDiv);
    } catch (error) {
        //clear the div
        displayDiv.innerHTML = '';
        // set the header
        h3.innerHTML = 'Error fetching recipe. Please try again later.';
        console.error(error);
        displayDiv.appendChild(h3)
        //show the error text from the API response
        newRecipeDiv.innerHTML =  error.response.data.message;
        newRecipeDiv.classList.add('error');
        displayDiv.appendChild(newRecipeDiv);
    }

   
}
