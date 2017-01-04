import React from 'react'

export default (props) => {
	const { name, minAge, maxAge, gender } = props.query.chatResults
	const { newRoom } = props.query
	let genderComposition = ''
	if(gender === 'male') genderComposition = 'Men'
	if(gender === 'female') genderComposition = 'Women'
	if(gender === 'any') genderComposition = 'anyone'

	return (
		    <div className="modal-header">
		        <button type="button" className="close" data-dismiss="modal">&times;</button>
		        <h4 className="modal-title">Welcome to {name}</h4>
		      <div className="modal-body">
		      <ul className="list-group">
			      {newRoom === false ? <li className=" list-group-item list-group-item-success">We found a room for you!</li> : 
			      <li className="list-group-item list-group-item-success">We couldn't find a room that matches, so we've created one for you!</li>}
			      <li className="list-group-item">The min age is: <strong>{minAge}</strong></li>
			      <li className="list-group-item">The max age is: <strong>{maxAge}</strong></li>
			      <li className="list-group-item">This chat is for: <strong>{genderComposition}</strong></li>
		      </ul>
		      </div>
		    </div>
	)

}