import React, { Component } from 'react'

import Navbar from '../base/navbar'

export default class Dashboard extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
			<Navbar />
			Dashboard
			</div>
		)
	}
}