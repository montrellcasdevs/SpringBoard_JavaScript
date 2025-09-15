document.addEventListener("DOMContentLoaded", function ()
{
	const noteContainer = document.getElementById("note-container");
	const newNoteButton = document.getElementById("new-note-button");
	const colorForm = document.getElementById("color-form");
	const colorInput = document.getElementById("color-input");

	// TODO: Load the note color from the local storage.
	let noteColor = localStorage.getItem("noteColor") || "#ffff88"; // Stores the selected note color from the form.
	// TODO: Load the note ID counter from the local storage.
	let randomNumber = Math.floor(Math.random() * 9) + 1;
	let noteIdCounter = localStorage.getItem("noteIdCounter");

 // Counter for assigning unique IDs to new notes.
	noteIdCounter = noteIdCounter !== null ? Number(noteIdCounter) : randomNumber; // Counter for assigning unique IDs to new notes.

	// TODO: Load the notes from the local storage.
	let savedNotes = JSON.parse(localStorage.getItem("notes")) || [
        { id: 1, content: "Hello World" },
        { id: 2, content: "Note 2" },
        { id: 3, content: "Note 3" }
    ];
	function addNewNote ()
	{
		const id = noteIdCounter;
		const content = `Note ${id}`;

		const note = document.createElement("textarea");
		note.setAttribute("data-note-id", id.toString()); // Stores the note ID to its data attribute.
		note.value = content; // Sets the note ID as value.
		note.className = "note"; // Sets a CSS class.
		note.style.backgroundColor = noteColor; // Sets the note's background color using the last selected note color.
		noteContainer.appendChild(note); // Appends it to the note container element as its child.

		noteIdCounter++; // Increments the counter since the ID is used for this note.

		// TODO: Add new note to the saved notes in the local storage.
		savedNotes.push({ id, content });
    localStorage.setItem("notes", JSON.stringify(savedNotes));
    localStorage.setItem("noteIdCounter", noteIdCounter);
	}

	colorForm.addEventListener("submit", function (event)
	{
		event.preventDefault(); // Prevents the default event.

		const newColor = colorInput.value.trim();  // Removes whitespaces.

		const notes = document.querySelectorAll(".note");
		for (const note of notes)
		{
			note.style.backgroundColor = newColor;
		}

		colorInput.value = ""; // Clears the color input field after from submission.

		noteColor = newColor; // Updates the stored note color with the new selection.

		// TODO: Update the note color in the local storage.
		localStorage.setItem("noteColor", noteColor);
	});

	newNoteButton.addEventListener("click", function ()
	{
		addNewNote();
	});

	document.addEventListener("dblclick", function (event)
	{
		if (event.target.classList.contains("note"))
		{
			event.target.remove(); // Removes the clicked note.

			// TODO: Delete the note from the saved notes in the local storage.
			const noteId = Number(event.target.getAttribute("data-note-id"));
            savedNotes = savedNotes.filter(note => note.id !== noteId);
            localStorage.setItem("notes", JSON.stringify(savedNotes));
		}
	});

	noteContainer.addEventListener("blur", function (event)
	{
		if (event.target.classList.contains("note"))
		{
			// TODO: Update the note from the saved notes in the local storage.
			 const noteId = Number(event.target.getAttribute("data-note-id"));
            const noteContent = event.target.value;
            const noteToUpdate = savedNotes.find(note => note.id === noteId);
            if (noteToUpdate) {
                noteToUpdate.content = noteContent;
                localStorage.setItem("notes", JSON.stringify(savedNotes));
            }
		}
	}, true);

	window.addEventListener("keydown", function (event)
	{
		/* Ignores key presses made for color and note content inputs. */
		if (event.target.id === "color-input" || event.target.type === "textarea")
		{
			return;
		}

		/* Adds a new note when the "n" key is pressed. */
		if (event.key === "n" || event.key === "N")
		{
			addNewNote(); // Adds a new note.
		}
	});
});
