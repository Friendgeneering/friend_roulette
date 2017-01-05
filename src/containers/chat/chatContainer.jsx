import React, { Component } from 'react'
import { connect } from 'react-redux'

class ChatContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			messages: ['This is cool', 'Does it work?']
		}
		this.renderMessages = this.renderMessages.bind(this)
	}

	renderMessages() {
		const { messages } = this.state
		return messages.map((message, i) => {
			return (
				<li key={i}>
		        <div className="avatar"><i className="material-icons">account_circle</i></div>
		      		<div className="msg">
			        <p>Lee</p>
			        <p>{message}</p>
			        <time>18:09</time>
		      	</div>
		    	</li>
			)
		})
	}

	render() {
		return (
		<div>
			<ul>
			{this.renderMessages()}
			</ul>
			<input type="text" placeholder="Type here!" className="chat-input"/>
			<button className="btn btn-success" id="sendMessage"><i className="material-icons">chat_bubble_outline</i></button>
		</div>
		)
	}
}

const mapStateToProps = ({ chat }) => {
	return { chat }
}

export default connect(mapStateToProps)(ChatContainer)