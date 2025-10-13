// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];

// Base API URL. Use the Rithm Jeopardy API (supports CORS).
// If you need to override locally, change this constant or run a local proxy.
const API_BASE = 'https://rithm-jeopardy.herokuapp.com/api';




// -------------------------------
// Implementation
// -------------------------------

const NUM_CATEGORIES = 6;
const NUM_QUESTIONS_PER_CAT = 5;

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
async function getCategoryIds() {
	// Fetch a batch of categories and choose those with at least
	// NUM_QUESTIONS_PER_CAT clues, then sample NUM_CATEGORIES of them.
	try {
		const resp = await axios.get(`${API_BASE}/categories?count=100`);
		const allCats = resp.data;
		const valid = allCats.filter(c => c.clues_count >= NUM_QUESTIONS_PER_CAT);
		if (valid.length < NUM_CATEGORIES) {
			// fallback: try a larger fetch
			const resp2 = await axios.get(`${API_BASE}/categories?count=200`);
			const more = resp2.data.filter(c => c.clues_count >= NUM_QUESTIONS_PER_CAT);
			valid.push(...more);
		}
		const chosen = _.sampleSize(valid, NUM_CATEGORIES);
		return chosen.map(c => c.id);
	} catch (err) {
		console.error('Error fetching category ids', err);
		throw err;
	}
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 */
async function getCategory(catId) {
	try {
		const resp = await axios.get(`${API_BASE}/category?id=${catId}`);
		const data = resp.data;
		const title = data.title;
		// pick NUM_QUESTIONS_PER_CAT random clues from data.clues
		const rawClues = data.clues.filter(c => c.question && c.answer);
		const chosen = _.sampleSize(rawClues, NUM_QUESTIONS_PER_CAT);
		const clues = chosen.map(c => ({ question: c.question, answer: c.answer, showing: null }));
		return { title, clues };
	} catch (err) {
		console.error('Error fetching category', err);
		throw err;
	}
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */
async function fillTable() {
	// clear any existing table
	const existing = document.getElementById('jeopardy');
	if (existing) existing.remove();

	const table = document.createElement('table');
	table.id = 'jeopardy';
	table.className = 'jeopardy-table';

	const thead = document.createElement('thead');
	const headRow = document.createElement('tr');
	categories.forEach((cat) => {
		const th = document.createElement('th');
		th.innerText = cat.title.toUpperCase();
		headRow.appendChild(th);
	});
	thead.appendChild(headRow);
	table.appendChild(thead);

	const tbody = document.createElement('tbody');
	for (let row = 0; row < NUM_QUESTIONS_PER_CAT; row++) {
		const tr = document.createElement('tr');
		for (let col = 0; col < NUM_CATEGORIES; col++) {
			const td = document.createElement('td');
			td.className = 'clue-cell';
			td.setAttribute('data-cat', col);
			td.setAttribute('data-clue', row);
			td.innerText = '?';
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);

	// Insert table before the controls container
	const controls = document.getElementById('jeopardy-controls');
	if (controls) {
		controls.parentNode.insertBefore(table, controls);
	} else {
		document.body.appendChild(table);
	}
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */
function handleClick(evt) {
	const td = evt.target.closest('td');
	if (!td || !td.classList.contains('clue-cell')) return;
	const catIdx = Number(td.getAttribute('data-cat'));
	const clueIdx = Number(td.getAttribute('data-clue'));
	const clue = categories[catIdx].clues[clueIdx];
	if (!clue) return;

	if (clue.showing === null) {
		// show question
		td.innerText = clue.question;
		clue.showing = 'question';
	} else if (clue.showing === 'question') {
		// show answer
		td.innerText = clue.answer;
		clue.showing = 'answer';
	} else {
		// already showing answer; do nothing
		return;
	}
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */
function showLoadingView() {
	// disable restart button
	const btn = document.getElementById('restart');
	if (btn) {
		btn.disabled = true;
		btn.innerText = 'Loading...';
	}
	// show spinner
	let spinner = document.getElementById('jeopardy-spinner');
	if (!spinner) {
		spinner = document.createElement('div');
		spinner.id = 'jeopardy-spinner';
		spinner.innerText = 'Loading...';
		spinner.style.cssText = 'position:fixed;top:10px;right:10px;padding:8px 12px;background:#fff;border:1px solid #ccc;border-radius:4px;';
		document.body.appendChild(spinner);
	}
}

/** Remove the loading spinner and update the button used to fetch data. */
function hideLoadingView() {
	const btn = document.getElementById('restart');
	if (btn) {
		btn.disabled = false;
		btn.innerText = 'Restart';
	}
	const spinner = document.getElementById('jeopardy-spinner');
	if (spinner) spinner.remove();
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */
async function setupAndStart() {
	clearError();
	showLoadingView();
	try {
		const ids = await getCategoryIds();
		// fetch all categories in parallel
		const promises = ids.map(id => getCategory(id));
		const results = await Promise.all(promises);
		categories = results;
		await fillTable();
	} catch (err) {
		console.error('Failed to set up game', err);
		// show friendly error banner with instructions
		const msg = (err && err.toString()) || 'Unknown error';
		showError('Failed to set up game — ' + msg + '.\nIf you are developing locally, make sure the proxy is running (see README).');
	} finally {
		hideLoadingView();
	}
}

function showError(message) {
  let banner = document.getElementById('jeopardy-error');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'jeopardy-error';
    banner.style.cssText = 'position:fixed;left:10px;right:10px;top:10px;padding:12px;background:#ffdddd;color:#800;border:1px solid #f00;border-radius:4px;z-index:9999;white-space:pre-wrap;font-family:monospace;';
    const close = document.createElement('button');
    close.innerText = 'Dismiss';
    close.style.cssText = 'margin-left:12px';
    close.addEventListener('click', () => banner.remove());
    banner.appendChild(close);
    document.body.appendChild(banner);
  }
  banner.firstChild && (banner.firstChild.textContent = message);
}

function clearError() {
  const banner = document.getElementById('jeopardy-error');
  if (banner) banner.remove();
}

/** On click of start / restart button, set up game. */
// create controls (restart button) and attach handler
function ensureControls() {
	let controls = document.getElementById('jeopardy-controls');
	if (!controls) {
		controls = document.createElement('div');
		controls.id = 'jeopardy-controls';
		controls.style.cssText = 'margin:16px;display:flex;justify-content:center;';
		const btn = document.createElement('button');
		btn.id = 'restart';
		btn.innerText = 'Restart';
		btn.addEventListener('click', async function () {
			// reset categories and table
			categories = [];
			const t = document.getElementById('jeopardy');
			if (t) t.remove();
			clearError();
			await setupAndStart();
		});
		controls.appendChild(btn);
		document.body.appendChild(controls);
	}
}

/** On page load, add event handler for clicking clues */
document.addEventListener('DOMContentLoaded', async function () {
	ensureControls();
	// delegate clicks to table
	document.body.addEventListener('click', handleClick);
	// start first game
	await setupAndStart();
});
