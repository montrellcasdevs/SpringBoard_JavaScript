function Message (props)
{
	// A simple wrapper that renders any children passed in via props
	return (
		<div>
			{props.children}
		</div>
	);
}
