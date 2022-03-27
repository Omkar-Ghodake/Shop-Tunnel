import React, { useContext } from 'react';
import alertContext from '../context/alert/alertContext';
import '../css/style.css';


const Alert = () => {

	const contextAlert = useContext(alertContext);

	const { alert } = contextAlert;

	return (
		<>
			{alert && <div className={`alert alert-${alert.type} position-absolute w-100 top-0`} role="alert">
				{alert.message}
			</div>}
		</>
	)
}

export default Alert