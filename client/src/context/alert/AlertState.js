import React, { useState } from 'react';
import AlertContext from './alertContext'

const AlertState = (props) => {

	const [alert, setAlert] = useState(null);

	const showAlert = (type, message) => {
		setAlert({
			type: type,
			message: message
		})

		setTimeout(() => {
			setAlert(null);
		}, 2000);
	}

	return (
		<>
			<AlertContext.Provider value={{ alert, showAlert }}>
				{props.children}
			</AlertContext.Provider>
		</>
	)
}

export default AlertState