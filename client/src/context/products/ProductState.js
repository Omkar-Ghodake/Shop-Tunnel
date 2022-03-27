import React, { useEffect, useState } from 'react';
import ProductContext from './productContext';

const ProductState = (props) => {
	const [products, setProducts] = useState([]);

	const getProducts = async () => {
		const response = await fetch('http://localhost:5000/products/fetch-all-products');
		const json = await response.json();

		setProducts(json.products);
	}

	useEffect(() => {
		getProducts();
	}, [products]);

	return (
		<>
			<ProductContext.Provider value={{ products }} >
				{props.children}
			</ProductContext.Provider>
		</>
	)
}

export default ProductState