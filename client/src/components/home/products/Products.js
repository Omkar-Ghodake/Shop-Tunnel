import React, { useContext, useRef, useState } from 'react';
import './product.css';
import productContext from '../../../context/products/productContext';
import wishlistContext from '../../../context/wishlists/wishlistContext';

const Products = () => {

	// const { title, price, likes, imgUrl, id } = props;
	const [likeBtn, setLikeBtn] = useState('regular');
	const [productId, setProductId] = useState('');

	const contextProduct = useContext(productContext);
	const { products } = contextProduct;

	const contextWishlist = useContext(wishlistContext);
	const { wishlists } = contextWishlist;

	const toggleLikeBtn = () => {
		if (likeBtn === 'regular') {
			setLikeBtn('solid');
		} else {
			setLikeBtn('regular');
		}
	}

	const handleAddToWishlistClick = async (pId, wId) => {
		const response = await fetch('http://localhost:5000/wishlist/add-product', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				productId: pId,
				wishlistId: wId
			})
		});

		const json = await response.json();
		console.log(json);
	}

	const refClose = useRef(null);

	return (
		<>
			{products.map((product) => {
				return <div className="col-lg-4 col-md-6 my-3" key={product._id}>
					<div className="card product-card m-auto text-center">
						<img src={product.imgUrl} className="card-img-top m-auto" alt="..." />
						<div className="card-body text-start p-2">
							<h6 className="card-title">{product.title}</h6>
							<p className="card-text">PRICE: <strong>&#8377; {(product.price).toLocaleString('en-IN')}</strong></p>
						</div>
						<div className="card-footer d-flex justify-content-between align-items-center">
							<div>
								{product.likes}
								<i className={`fa-${likeBtn} fa-heart mx-2 p-1 rounded-circle text-danger`} style={{ cursor: 'pointer' }} onClick={toggleLikeBtn}></i>
							</div>
							<button className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addToWishlistModal" onClick={() => {
								setProductId(product._id);
							}} >Add to Wishlist</button>
						</div>
					</div>
				</div>
			})}


			{/* <!-- Add Wishlist Modal --> */}
			<div className="modal fade" method='put' id="addToWishlistModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Add to Wishlist</h5>
							<button ref={refClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							{
								wishlists.length !== 0 ? wishlists.map((wishlist) => {
									return <div key={wishlist._id} className="card">
										<div className="card-body d-flex justify-content-between align-items-center">
											<strong>{wishlist.title}</strong>
											<button className="btn btn-outline-info btn-sm" onClick={() => {
												handleAddToWishlistClick(productId, wishlist._id);
											}}>
												<i className="fa-solid fa-plus"></i>
											</button>
										</div>
									</div>
								}) : <h2>No wishlists to add products</h2>
							}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Products;    