import React from 'react'

import Navbar from '../base/navbar'
import Modal from '../../containers/chat/findChatModal'

export default () => (
		<div>
		<Navbar />
			<div className="sidebar-container">
			<button className="btn btn-success btn-lg" data-toggle="modal" data-target="#findChat">
				Find New Friends!
			</button>
							
			<div id="findChat" className="modal fade" role="dialog">
			  <Modal />
			</div>
			</div>
		</div>
)
