import React, { useEffect, useState } from 'react';
import WishlistContext from './wishlistContext';

const WishlistState = (props) => {

	const [wishlists, setWishlists] = useState([])

	const getWishlists = async () => {
		const response = await fetch('http://localhost:5000/wishlists');
		const json = await response.json();

		setWishlists(json.wishlists);
	}

	useEffect(() => {
		getWishlists();
	}, [wishlists]);

	return (
		<>
			<WishlistContext.Provider value={{ wishlists }}>
				{props.children}
			</WishlistContext.Provider>
		</>
	)
}

export default WishlistState