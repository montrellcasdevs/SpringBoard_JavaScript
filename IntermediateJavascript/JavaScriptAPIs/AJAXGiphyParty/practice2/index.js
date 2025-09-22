
//Request to an api service x2
//console.log(axios)
/**
 * //Test to see if axios runs
 * const axios = require('axios');
 * */

// Make a request for a user with a given ID
// axios.get('/user?ID=12345')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });
// Optionally the request above could also be done as
/***Below gets the response object ---Returns the key value pairs 
 * axios.get('https://dog.ceo/api/breeds/image/random').then((response)=>{
 * console.log(response.data) //drilling down to the data
 * })
 * */
/**** Another test 
 * axios.get('https://official-joke-api.appspot.com/random_joke').then((response)=>{
 * console.log(response.data)
 * })
 * */
/**** Another test 
 * axios.get('https://api.genderize.io/?name=luc').then((response)=>{
 * console.log(response.data.gender)   //male
 * })
*/
/** THIS IS USING FETCH
fetch('https://api.genderize.io/?name=luc')
  .then((response) => response.json())
  .then((data) => {
    console.log(data.name);   
  });
*/

//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });  

  // Want to use async/await? Add the `async` keyword to your outer function/method.
// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

/*** 
 * ///////////(4)Spoonacular API
 * const spoonacularAPIKEY = 'b0afa02ef5e646848b8e3cc9f8b72f5b';
 * 
 * axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularAPIKEY}&cuisine=Italian&diet=vegetarian`).then((response) => {
 * console.log(response.data);
 * });
 * **********/

/////////////////(5)Spoonacular API