
const users = [
	{ firstName: "Alice", lastName: "Smith", points: 120 },
	{ firstName: "Bob", lastName: "Johnson", points: 80 },
	{ firstName: "Charlie", lastName: "Brown", points: 150 }
];

const updatedUsers = users.map(user => ({
	fullName: `${user.firstName} ${user.lastName}`,
	membershipStatus: user.points > 100 ? "Premium" : "Standard" //evaluates the user's points to determine membership status
}));

console.log(updatedUsers);

