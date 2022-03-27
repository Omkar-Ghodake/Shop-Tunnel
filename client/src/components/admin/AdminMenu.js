import React, { useContext, useState, useRef } from 'react';
import productContext from '../../context/products/productContext';
import { useNavigate } from 'react-router-dom';
import alertContext from '../../context/alert/alertContext';
import { Link } from 'react-router-dom';

const AdminMenu = () => {

	const contextProduct = useContext(productContext);
	const { products } = contextProduct;

	const contextAlert = useContext(alertContext);
	const { showAlert } = contextAlert;

	const [productDetails, setProductDetails] = useState({
		productTitle: '',
		productPrice: '',
		productImgUrl: ''
	});

	const [productId, setProductId] = useState('');

	let productNumber = 1;
	let increaseNumberByOne = () => {
		productNumber++
	}

	const navigate = useNavigate();

	const handleLogOut = () => {
		localStorage.removeItem('adminToken');
		navigate('/');
		showAlert('success', 'ADMIN Logged Out.');
	}

	const refClose = useRef(null);

	const handleProductDelete = async () => {
		await fetch('http://localhost:5000/admin/products/delete-product', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title: productDetails.productTitle })
		})

		showAlert('danger', `Deleted: \n'${productDetails.productTitle}'`)

		refClose.current.click();
	}

	const handleSubmitClick = async (e) => {
		e.preventDefault();

		await fetch('http://localhost:5000/admin/products/edit-product', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: productId, title: productDetails.productTitle, price: productDetails.productPrice, imgUrl: productDetails.productImgUrl
			})
		});

		showAlert('success', `Following product was updated: \n'${productDetails.productTitle}'`)

		refClose.current.click();
	}

	const onChange = (e) => {
		setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
	}

	return (
		<>
			{localStorage.getItem('adminToken') ?
				<div className="menu h-50 d-flex position-relative">

					<div className="products">
						{products.map((product) => {
							return <div key={product._id}>
								<div className="card product-list-card my-2">
									<div className="card-body d-flex">
										<div className="product-number my-1">
											<b>{productNumber}.</b>
										</div>
										<div className="product-name my-1">
											<b>{product.title}</b>
										</div>
										<div className="edit-btn mx-4">
											<button className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => {
												setProductDetails({
													productTitle: product.title,
													productPrice: product.price,
													productImgUrl: product.imgUrl
												});
												setProductId(product._id);
											}} >
												<i className="fa-regular fa-pen-to-square"></i>
											</button>
										</div>
										<div className="edit-btn mx-4">
											<button className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => {
												setProductDetails({
													productTitle: product.title,
													productPrice: product.price,
													productImgUrl: product.imgUrl
												})
											}}>
												<i className="fa-regular fa-trash-can"></i>
											</button>
										</div>
									</div>
								</div>
								{increaseNumberByOne()}
							</div>
						})}
					</div>
					<div className='position-absolute top-0 end-0 m-2'>
						<Link to='/admin/menu/add-product' className="btn btn-outline-primary mx-2">Add Products</Link>
						<button className="btn btn-outline-success mx-2" onClick={handleLogOut}>
							<i className="fa-solid fa-arrow-right-from-bracket"></i>
						</button>
					</div>


					{/* <!-- Confirm DELETE Modal --> */}
					<div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="exampleModalLabel">"{productDetails.productTitle}"</h5>
									<button ref={refClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div className="modal-body">
									Deleting this item will remove the product from database permanently. Delete on your own risk.
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-primary" data-bs-dismiss="modal">No</button>
									<button type="button" className="btn btn-secondary" onClick={handleProductDelete}>Yes</button>
								</div>
							</div>
						</div>
					</div>

					{/* <!-- EDIT Modal --> */}
					<div className="modal fade" method='put' id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="exampleModalLabel">"{productDetails.productTitle}"</h5>
									<button ref={refClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div className="modal-body">
									<form className='roboto'>
										<div className="my-2">
											<label htmlFor="productTitle" className="form-label">Product Title</label>
											<input type="text" className="form-control" id="productTitle" name='productTitle' onChange={onChange} value={productDetails.productTitle} />
										</div>
										<div className="my-2">
											<label htmlFor="productPrice" className="form-label">Product Price</label>
											<input type="text" className="form-control" id="productPrice" name='productPrice' onChange={onChange} value={productDetails.productPrice} />
										</div>
										<div className="my-2">
											<label htmlFor="productImgUrl" className="form-label">Product Image Url</label>
											<input type="text" className="form-control" id="productImgUrl" name='productImgUrl' onChange={onChange} value={productDetails.productImgUrl} />
										</div>
										<div className="submit-btn text-end">
											<button className="btn btn-primary" onClick={handleSubmitClick}>Save Product</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>

				</div> :
				<h1 className='text-center'>Restricted Area <i className="fa-solid fa-circle-exclamation"></i></h1>
			}
		</>
	)
}

export default AdminMenu