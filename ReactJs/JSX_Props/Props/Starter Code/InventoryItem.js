function InventoryItem (props)
{
	// Provide a default quantity of 0 if not passed in
	const { name, type, price, quantity = 0 } = props;
	const totalValue = (price || 0) * quantity;

	return (
		<div>
			<h2>{name} ({type}) - ${price ? price.toFixed(2) : '0.00'}</h2>
			<p>Quantity: {quantity}</p>

			{quantity < 5 && (
				<Message>
					Low stock: Only {quantity} left!
				</Message>
			)}

			{totalValue > 1000 && (
				<Message>
					High value item: Total value is ${totalValue.toFixed(2)}
				</Message>
			)}
		</div>
	);
}
