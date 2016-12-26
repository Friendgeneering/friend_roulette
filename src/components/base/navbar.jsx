import React, { Component } from 'react'


export default class Navbar extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	render() {
		return (
			<div>
			<nav className="navbar navbar-default">
  				<div className="container">
    				<ul className="nav navbar-nav">
    					<li><a href="#">Link</a></li>
    				</ul>
  				</div>
			</nav>
			</div>
		)
	}
}