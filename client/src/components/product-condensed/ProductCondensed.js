import React from 'react'

const ProductCondensed = (props) => {

	const { products } = props;

	return (
		<>
			{products.map((product) => {
				return <div key={product._id}>
					<li className="list-group-item">
						{product.title} <br />
						<strong>&#8377; {product.price}</strong>
					</li>
				</div>
			})}
		</>
	)
}

export default ProductCondensed