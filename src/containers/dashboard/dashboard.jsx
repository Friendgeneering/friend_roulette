import React,{ Component } from 'react'
import { connect } from 'react-redux'


import Navbar from '../../components/base/navbar'
import Modal from '../chat/findChatModal'
import UserChatList from '../../components/chat/userChatList'
import ChatContainer from '../chat/chatContainer' 

import { fetchUserRooms } from '../chat/chat.actions'

class Dashboard extends Component {

	componentDidMount() {
		const { fetchUserRooms } = this.props
		/*Fetching chat rooms user is associated with
		to populate user chat list component
		*/ 
		fetchUserRooms()
	}

	render() {
		return (
		<div>
		<Navbar />
		 <div className="dashboard-container">
			<div className="sidebar-container">
			<button className="btn btn-success btn-lg" data-toggle="modal" data-target="#findChat">
				Find New Friends!
			</button>
							
			<div id="findChat" className="modal fade" role="dialog">
			  <Modal />
			</div>
			  <UserChatList {...this.props.chat} />
			</div>
			<div className="chat-container">
				<ChatContainer />
			</div>
		  </div>
		</div>
		)
	}
}


const mapStateToProps = ({ chat }) => {
	return { chat }
}


export default connect(mapStateToProps, { fetchUserRooms })(Dashboard)
