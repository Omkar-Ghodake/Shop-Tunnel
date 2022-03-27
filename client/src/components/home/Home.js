import React, { useContext, useRef, useState } from 'react';
import Products from './products/Products';
import Wishlists from '../wishlists/Wishlists';
import wishlistContext from '../../context/wishlists/wishlistContext';
import alertContext from '../../context/alert/alertContext';
import './home.css';

const Home = () => {
	const contextWishlist = useContext(wishlistContext);
	const { wishlists } = contextWishlist;

	const contextAlert = useContext(alertContext);
	const { showAlert } = contextAlert;

	const [wishlistDetails, setWishlistDetails] = useState({ wishlistTitle: '' });

	const refClose = useRef(null);

	const handleSubmitClick = async (e) => {
		e.preventDefault();

		await fetch('http://localhost:5000/create-wishlist', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title: wishlistDetails.wishlistTitle })
		});

		refClose.current.click();
		showAlert('info', 'Wishlist Created')
	}

	const onChange = (e) => {
		setWishlistDetails({ ...wishlistDetails, [e.target.name]: e.target.value });
	}

	return (
		<>
			<div className="row my-3">
				<div className="col-lg-8">
					<div className="row">
						<Products />
					</div>
				</div>
				<div className="col-lg-4 my-3">
					<h3 className='d-flex justify-content-between align-items-center'>
						Wishlists
						<i className="fa-solid fa-plus create-wishlist px-2 py-1 rounded" data-bs-toggle="modal" data-bs-target="#addWishlistModal"></i>
					</h3>
					<div className="my-3">
						{wishlists.map((wishlist) => {
							return <div key={wishlist._id}>
								<Wishlists title={wishlist.title} products={wishlist.products} id={wishlist._id} />
							</div>
						})}
					</div>
				</div>
			</div>

			{/* <!-- Add Wishlist Modal --> */}
			<div className="modal fade" method='put' id="addWishlistModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Create a Wishlist</h5>
							<button ref={refClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form className='roboto' method='post' onSubmit={handleSubmitClick}>
								<div className="my-2">
									<label htmlFor="wishlistTitle" className="form-label">Wishlist Name</label>
									<input type="text" className="form-control" id="wishlistTitle" name='wishlistTitle' onChange={onChange} value={wishlistDetails.wishlistTitle} />
								</div>
								<div className="submit-btn text-end">
									<button className="btn btn-primary">Create Wishlist</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home