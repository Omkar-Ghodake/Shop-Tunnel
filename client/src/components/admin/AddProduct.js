import React, { useContext, useState } from 'react';
import alertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

	let navigate = useNavigate();

	const [productDetails, setProductDetails] = useState({
		productTitle: '',
		productPrice: '',
		productImgUrl: ''
	});

	const contextAlert = useContext(alertContext);
	const { showAlert } = contextAlert;

	const handleSubmitClick = async (e) => {
		e.preventDefault();

		await fetch('http://localhost:5000/products/add-products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title: productDetails.productTitle, price: productDetails.productPrice, imgUrl: productDetails.productImgUrl })
		});

		showAlert('success', 'Product Added succesfully.');

		setProductDetails({
			productTitle: '',
			productPrice: '',
			productImgUrl: ''
		});
	}

	const handleLogOut = () => {
		localStorage.removeItem('adminToken');
		navigate('/admin/login');
		showAlert('success', 'Logged Out.')
	}

	const onChange = (e) => {
		setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
	}

	return (
		<>
			{localStorage.getItem('adminToken') ?
				<div>
					<div className="text-end">
						<button className="logout-btn btn btn-outline-success btn-sm my-3" onClick={handleLogOut}>Log Out</button>
					</div>
					<form className='roboto' method='post' onSubmit={handleSubmitClick}>
						<div className="my-2">
							<label htmlFor="productTitle" className="form-label">Product Title</label>
							<input type="text" className="form-control" id="productTitle" name='productTitle' onChange={onChange} value={productDetails.productTitle} />
						</div>
						<div className="my-2">
							<label htmlFor="productPrice" className="form-label">Product Price</label>
							<input type="text" className="form-control" id="productPrice" name='productPrice' onChange={onChange} value={productDetails.productPrice} />
							<div id="emailHelp" class="form-text">Enter only numbers (No charcters or symbols other than numbers are allowed.)</div>
						</div>
						<div className="my-2">
							<label htmlFor="productImgUrl" className="form-label">Product Image Url</label>
							<input type="text" className="form-control" id="productImgUrl" name='productImgUrl' onChange={onChange} value={productDetails.productImgUrl} />
						</div>
						<button type="submit" className="btn btn-outline-primary">Add Product</button>
					</form>
				</div> :
				<h1 className='text-center'>Restricted Area <i class="fa-solid fa-circle-exclamation"></i></h1>}
		</>
	)
}

export default AddProduct