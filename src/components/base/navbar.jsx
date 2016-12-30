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
  				<div className="nav-container">
  					<a className="navbar-brand">Friend Roulette</a>
    				<ul className="nav navbar-right">
    				<div className="dropdown">
    				<button id="nav-profile" className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
					    <i className="material-icons">account_circle</i>
					    <span className="caret"></span>
					    </button>
					    <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
					      <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Profile</a></li>
					      <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Logout</a></li>
					    </ul>
  					</div>
    				</ul>
  				</div>
			</nav>
			</div>
		)
	}
}