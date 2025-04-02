import React, { useEffect, useState } from 'react';

const Products = ({ setTotalPrice }) =>  {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        setTotalPrice(totalPrice);
    }, [selectedProducts, setTotalPrice]);
    const totalPrice = selectedProducts.reduce((total, product) => total + product.Price, 0);

    //const totalPrice = selectedProducts.reduce((total, product) => total + product.Price, 0);

    const handleSelect = (product) => {
        if (selectedProducts.includes(product)) {
            setSelectedProducts(selectedProducts.filter(p => p.ID !== product.ID));
        } else {
            setSelectedProducts([...selectedProducts, product]);
        }
    };

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map(product => (
                    <li key={product.ID}>
                        <input
                            type="checkbox"
                            checked={selectedProducts.includes(product)}
                            onChange={() => handleSelect(product)}
                        />
                        {product.Name} - ${product.Price}
                    </li>
                ))}
            </ul>
            <h2>Total Price: ${totalPrice}</h2>
        </div>
    );
};

export default Products;