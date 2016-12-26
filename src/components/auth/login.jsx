import React, { Component } from 'react'

import { base } from '../base'


export default class Login extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	render() {
		return (
			<div>
			<base.navbar />
			<div className="auth-container">	
				<ul className="nav nav-tabs" role="tablist">
				    <li role="presentation" className="active"><a href="#login" aria-controls="login" role="tab" data-toggle="tab">Login</a></li>
				    <li role="presentation"><a href="#signup" aria-controls="signup" role="tab" data-toggle="tab">Sign Up</a></li>
	  			</ul>



				<div className="tab-content">
				    <div role="tabpanel" className="tab-pane active" id="login">Login</div>
				    <div role="tabpanel" className="tab-pane" id="signup">Sign Up</div>
				</div>
			</div>
			</div>
		)
	}
}