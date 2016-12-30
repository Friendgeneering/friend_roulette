import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest'
import { connect } from 'react-redux'

import { ageInIncrementsOf5, validateChatQuery } from './util'
import { findChatRoom } from './chat.actions'

class Modal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			gender: 'Men',
			location: '',
			minAge: 18,
			maxAge: 30,
			errors: []
		}
		this.fetchRooms = this.fetchRooms.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.onSuggestSelect = this.onSuggestSelect.bind(this)
	}

	handleChange(e, fieldType) {
		let value = e.target.value
		//Parse numbers
		if(fieldType === 'minAge' || fieldType === 'maxAge') {
			value = parseInt(value, 10)
		}

		let newState = this.state
		newState[fieldType] = value
		this.setState({...this.state, ...newState})
	}

	onSuggestSelect(suggest, location) {
			let newState = this.state
			newState.location = suggest.label
			this.setState({ ...this.state, ...newState })	
	}

	fetchRooms() {
		const { findChatRoom } = this.props
		const { minAge, maxAge } = this.state
		let queryErrors = validateChatQuery(minAge, maxAge)

		if(queryErrors.length > 0) {
			this.setState({ errors: queryErrors })
		} else {	
			findChatRoom(this.state)
			.then(data => {
				console.log('chat room data', data)
			})
		}



	}

	render() {
		//Array of ages for min & max age inputs
		let ages = ageInIncrementsOf5()

		const { errors } = this.state

		return (
		<div className="modal-dialog">
		    <div className="modal-content">

		      <div className="modal-header">
		        <button type="button" className="close" data-dismiss="modal">&times;</button>
		        <h4 className="modal-title">I'm looking to meet..</h4>
		      </div>

		      <div className="modal-body">
		      <div className="input-group">
				<span className="input-group-addon">Gender</span>
		        <select className="form-control" name="age" value={this.state.gender} onChange={(e) => this.handleChange(e, 'gender')}>
  					<option value='male'>Men</option>
  					<option value='female'>Women</option>
  					<option value='any'>Anyone</option>
				</select>
			   </div>
			   <div className="input-group">
				<span className="input-group-addon"><span className="glyphicon glyphicon-map-marker"></span>In: </span>
				<Geosuggest
		          ref={el=>this._geoSuggest=el}
		          country='us'
		          inputClassName="form-control"
		          types={['(cities)']}
		          onSuggestSelect={this.onSuggestSelect}
		          onSuggestNoResults={this.onSuggestNoResults}
		      	/>
		      	</div>
		      	<div className="input-group">
		      	<span className="input-group-addon">Between the ages of: </span>
		      	<div className="col-xs-4">
		      	<select className="form-control" name="age" value={this.state.minAge} onChange={(e) => this.handleChange(e, 'minAge')}>
  					{ages.map(age => <option key={age} value={age}>{age}</option>)}
				</select>
				</div>
				<div className="col-xs-2">and</div>
				<div className="col-xs-4">
				<select className="form-control" name="age" value={this.state.maxAge} onChange={(e) => this.handleChange(e, 'maxAge')}>
  					{ages.map(age => <option key={age} value={age}>{age}</option>)}
				</select>
		      	</div>
		      	</div>
			  </div>
		      <div className="modal-footer">
	      		<ul className="queryErrors">
	      		{errors.length > 0 ? errors.map(e => <li key={e}>{e}</li>) : null}
	      		</ul>
		      	<div className="btn-group">
		        	<button type="button" className="btn btn-success" onClick={this.fetchRooms}>Find a Chat!</button>
		        	<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
		        </div>
		      </div>
		    </div>
		</div>
		);
	}
}

export default connect(null, { findChatRoom })(Modal)