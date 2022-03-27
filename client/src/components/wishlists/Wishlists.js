import './wishlists.css';
import React from 'react'
import ProductCondensed from '../product-condensed/ProductCondensed';

const Wishlists = (props) => {

	const { title, products, id } = props;

	const handleDeleteClick = async () => {
		await fetch('http://localhost:5000/wishlist/delete-wishlist', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: id })
		});
	}

	return (
		<>
			<div className="card my-3">
				<div className="card-header d-flex justify-content-between align-items-center">
					<div className="left">
						{title}
					</div>
					<div className="right">
						<i className="fa-regular fa-trash-can text-danger rounded p-1 mx-1 delete-wishlist" onClick={handleDeleteClick}></i>
					</div>
				</div>
				<ul className="list-group list-group-flush">
					<ProductCondensed products={products} />
				</ul>
			</div>
		</>
	)
}

export default Wishlists