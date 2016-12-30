//Helper Functions for the Chat Dashboard

export const ageInIncrementsOf5 = () => {
	let results = [18];

	for(let i = 20; i <= 90; i+=5) {
		results.push(i);
	}

	return results
}

export const validateChatQuery = (minAge, maxAge) => {
	let errors = []

	if(minAge === maxAge) {
		errors.push('Please choose a range of ages')
	}

	if(maxAge < minAge) {
		errors.push('The max age should be higher than the min. age')
	}

	return errors
}