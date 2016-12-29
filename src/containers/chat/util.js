//Helper Functions for the Dashboard

export const ageInIncrementsOf5 = () => {
	let results = [18];

	for(let i = 20; i <= 90; i+=5) {
		results.push(i);
	}

	return results
}