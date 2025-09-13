document.addEventListener("DOMContentLoaded", function ()
{
	const boxContainer = document.getElementById("box-container");
	const newBoxButton = document.getElementById("new-box-button");
	const colorForm = document.getElementById("color-form");
	const colorInput = document.getElementById("color-input");

	let boxColor = null; // Stores the selected box color from the form.
	let boxIdCounter = 0; // Counter for assigning unique IDs to new boxes.

	function addNewBox ()
	{
		const box = document.createElement("div");
		box.setAttribute("data-box-id", boxIdCounter.toString()); // Stores the box ID to its data attribute.
		box.textContent = `Box ${boxIdCounter}`; // Sets the box ID as text.
		box.className = "box"; // Sets a CSS class.
		box.style.backgroundColor = boxColor; // Sets the box's background color using the last selected box color.
		boxContainer.appendChild(box); // Appends it to the box container element as its child.

		boxIdCounter++; // Increments the counter since the ID is used for this box.
	}

	colorForm.addEventListener("submit", function (event)
	{
		event.preventDefault(); // Prevents the default event.

		const newColor = colorInput.value.trim();  // Removes whitespaces.

		const boxes = document.querySelectorAll(".box");
		for (const box of boxes)
		{
			box.style.backgroundColor = newColor;
		}

		colorInput.value = ""; // Clears the color input field after from submission.

		boxColor = newColor; // Updates the stored box color with the new selection.
	});

	newBoxButton.addEventListener("click", function ()
	{
		addNewBox();
	});

	document.addEventListener("dblclick", function (event)
	{
		if (event.target.classList.contains("box"))
		{
			event.target.remove(); // Removes the clicked box.
		}
	});

	document.addEventListener("mouseover", function (event)
	{
		if (event.target.classList.contains("box"))
		{
			event.target.textContent = `x: ${event.pageX}, y: ${event.pageY}`; // Temporarily change display text to show coordinates.
		}
	});

	document.addEventListener("mouseout", function (event)
	{
		if (event.target.classList.contains("box"))
		{
			/* Restores the original text using the box ID from the data attribute. */
			const boxId = event.target.getAttribute("data-box-id");
			event.target.textContent = `Box ${boxId}`;
		}
	});

	window.addEventListener("keydown", function (event)
	{
		/* Ignores key presses made for color input. */
		if (event.target.id === "color-input")
		{
			return;
		}

		/* Adds a new box when the "n" key is pressed. */
		if (event.key === "n" || event.key === "N")
		{
			addNewBox(); // Adds a new box.
		}
	});
});
