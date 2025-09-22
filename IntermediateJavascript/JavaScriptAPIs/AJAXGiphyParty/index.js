// look back at the <readme.md> file for some hints //
// working API key //
const giphyApiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";

//1.& 2 Gets the object on its own
//  async function giphyRequest2() {
//     const response = await axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}`);
//     console.log(response);
    
    
//   }
//   giphyRequest = async () => {
//   const response = await axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}&limit=10`);
//   console.log('status:', typeof response.status, response.status);
//   console.log('data type:', typeof response.data, Object.keys(response.data));
//   console.log('data array length:', Array.isArray(response.data.data), response.data.data.length);
//   console.log('first item keys:', Object.keys(response.data.data[0]));
//   console.log('first item images keys:', Object.keys(response.data.data[0].images));
//   console.log('downsized object:', response.data.data[0].images.downsized);
//   console.log('downsized url:', response.data.data[0].images.downsized.url);
//   const gifs = response.data.data;
//   displayGifs(gifs);
// };

//3
// async function giphyRequest() {
//   const response = await axios.get(`https://api.giphy.com/v1/gifs/trending`, {
//     params: { api_key: giphyApiKey, limit: 10 }
//   });
//   console.log(response);

//   // If we only want to set a single <img id="gif"> to the first result's downsized URL
//   const first = response && response.data && response.data.data && response.data.data[0];
//   if (first && first.images && first.images.downsized && first.images.downsized.url) {
//     const gifEl = document.getElementById('gif');
//     if (gifEl) {
//       gifEl.src = first.images.downsized.url;
//       gifEl.alt = first.title || 'giphy gif';
//     } else {
//       console.warn('No element with id "gif" found in DOM');
//     }
//   } else {
//     console.warn('No GIFs returned from API');
//   }
// }

// document.addEventListener('DOMContentLoaded', () => {
//   // run the request after DOM is ready so #gif exists
//   giphyRequest().catch(err => console.error('Giphy request failed', err));
// });

// -------------------------------
// Item 4 explanation notes
// -------------------------------
// This file implements a simple search UI that queries the Giphy Search API
// and renders the returned GIFs into the DOM. The main pieces are:
// - `searchGifs(query)`: calls the Giphy search endpoint and returns an
//    array of GIF objects.
// - `renderGifs(gifs)`: given an array of GIF objects, creates DOM nodes
//    (images) and inserts them into `#results` inside a responsive grid.
// - Submit handler on `#search-form`: reads the user's query, shows a
//    loading state, calls `searchGifs`, and forwards results to `renderGifs`.

/**
 * Perform a search request against the Giphy Search endpoint.
 *
 * @param {string} query - User search term (e.g., "cats").
 * @param {number} [limit=12] - Maximum number of GIFs to request.
 * @returns {Promise<Array>} - Resolves to an array of GIF result objects.
 */
async function searchGifs(query, limit = 12) {
	// axios.get returns a response object; Giphy's useful data is in
	// response.data.data (an array of GIF objects).
	const resp = await axios.get('https://api.giphy.com/v1/gifs/search', {
		params: { api_key: giphyApiKey, q: query, limit }
	});

	// Log the full axios response so you can inspect headers, status, and
	// the JSON payload in DevTools (per the assignment instructions).
	console.log('Giphy full response:', resp);
	// Log the data payload (the JSON body) for easier inspection
	console.log('Giphy response.data:', resp.data);

	// Guard and return the array (or an empty array if the structure is unexpected).
	return resp && resp.data && resp.data.data ? resp.data.data : [];
}


/**
 * Render an array of GIF objects into the `#results` container.
 * Each GIF becomes an <img> inside a `.gif-item` which are placed into
 * a `.gif-grid` container for CSS grid styling.
 *****/
function renderGifs(gifs) {
	const results = document.getElementById('results');
	// Clear previous results first
	results.innerHTML = '';

	if (!gifs || gifs.length === 0) {
		// Show friendly message when no results
		results.innerHTML = '<p>No GIFs found.</p>';
		return;
	}

	// BUILD a grid CONTAINER so we can append all items at once
	const grid = document.createElement('div');
	grid.className = 'gif-grid';

	gifs.forEach(gif => {
		// GIF objects contain an `images` object with multiple formats.
		// Prefer `fixed_width` (good size) and fall back to `downsized` if needed.
		const url = gif.images && (gif.images.fixed_width || gif.images.downsized) && (gif.images.fixed_width.url || gif.images.downsized.url);
		if (!url) return; // skip items we can't render

		// Create an item wrapper and image node
		const item = document.createElement('div');
		item.className = 'gif-item';

		const img = document.createElement('img');
		img.src = url; // set the GIF source
		img.alt = gif.title || 'giphy gif';

		item.appendChild(img);
		grid.appendChild(item);
	});

	// Insert the fully-built grid into the results container
	results.appendChild(grid);
}


/**
 * Append GIFs to the existing results grid without clearing previous GIFs.
 * If a grid does not yet exist, create it. This satisfies the requirement
 * that multiple form submissions produce multiple GIFs on the page.
 */
function appendGifs(gifs) {
	const results = document.getElementById('results');
	if (!results) return;

	// Find existing grid or create a new one
	let grid = results.querySelector('.gif-grid');
	if (!grid) {
		grid = document.createElement('div');
		grid.className = 'gif-grid';
		results.appendChild(grid);
	}

	gifs.forEach(gif => {
		const url = gif.images && (gif.images.fixed_width || gif.images.downsized) && (gif.images.fixed_width.url || gif.images.downsized.url);
		if (!url) return;

		const item = document.createElement('div');
		item.className = 'gif-item';

		const img = document.createElement('img');
		img.src = url;
		img.alt = gif.title || 'giphy gif';

		item.appendChild(img);
		grid.appendChild(item);
	});
}


// Wire up the form submit handler after DOM is ready. This makes sure
// elements like `#search-form` and `#results` exist when we try to bind.
document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('search-form');
	const input = document.getElementById('search-input');
	const clearBtn = document.getElementById('clear-results');

	// When the form is submitted, prevent default navigation and run a search.
		form.addEventListener('submit', async (ev) => {
			ev.preventDefault();
			// Read the input value from the text input element
			const q = input.value.trim();
			if (!q) return; // ignore empty queries

			const results = document.getElementById('results');
			// Append a transient loading indicator so existing GIFs remain visible
			const loading = document.createElement('p');
			loading.className = 'loading';
			loading.textContent = 'Loading...';
			results.appendChild(loading);

			try {
				const gifs = await searchGifs(q, 24);
				// Remove loading indicator
				loading.remove();

				if (!gifs || gifs.length === 0) {
					const no = document.createElement('p');
					no.textContent = 'No GIFs found.';
					results.appendChild(no);
				} else {
					// Append new GIFs to whatever is already on the page
					appendGifs(gifs);
				}
			} catch (err) {
				console.error(err);
				loading.remove();
				const errP = document.createElement('p');
				errP.textContent = `Error loading GIFs: ${err?.message || err}`;
				results.appendChild(errP);
			}
		});

			// Clear results button: removes all GIFs and helper messages from the results container
			if (clearBtn) {
				clearBtn.addEventListener('click', () => {
					const results = document.getElementById('results');
					if (results) results.innerHTML = '';
				});
			}
});



//const spoonacularAPIKEY = 'b0afa02ef5e646848b8e3cc9f8b72f5b';

// const button = document.getElementById("submit");
// const displayDiv = document.getElementById('results');

//  console.log(button); //typeof button is object Identifying the button
// button.addEventListener('click', () => {
//      console.log("Button clicked"); // testing if the button clicks from the button
//      getRequest();
//  });
//  async function getRequest() {

//     //Create a new div
//      let newRecipeDiv = document.createElement('div');
//      let h3 = document.createElement('h3');

//      //try{
//      const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKey}`);
//      console.log(response);
//      //displayDiv.innerHTML = ''; // Clear previous content
    
//     //set title into the header
//     h3.innerText = response.data.data[0].title;
//     displayDiv.appendChild(h3);

//     //set the recipe summary in new div
//    newRecipeDiv.innerHTML = response.data.data[0].summary;
//    displayDiv.appendChild(newRecipeDiv);
//     } catch (error) {
//         //clear the div
//         displayDiv.innerHTML = '';
//         // set the header
//         h3.innerHTML = 'Error fetching recipe. Please try again later.';
//         console.error(error);
//         displayDiv.appendChild(h3)
//         //show the error text from the API response
//         newRecipeDiv.innerHTML =  error.response.data.message;
//         newRecipeDiv.classList.add('error');
//         displayDiv.appendChild(newRecipeDiv);
  //   }
