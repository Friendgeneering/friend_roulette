import React from 'react'


export default (props) => (
	<div className="container">
		<div>Chats</div>
		<div className="col-xs-3">
		<ul className="list-group">
		{props.userChats.map(chat => <li key={chat.name} className="list-group-item">{chat.name}</li>)}
		</ul>
		</div>
	</div>
)


