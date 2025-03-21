import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderStock = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/products/all');
                setProducts(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition relative h-full">
                    <div>
                        <img src={product.image} alt={product.productname} className="w-full h-48 object-cover rounded-md mb-4" />
                        <h2 className="text-lg font-semibold">{product.productname}</h2>
                        <p className="text-gray-500 text-sm">Item ID: {product.itemid}</p>
                    </div>
                    <button
                        onClick={() => handleOrder(product)}
                        className="bg-blue-600 text-white text-s py-2 px-6 rounded hover:bg-blue-700 transition absolute bottom-4 right-4"
                    >
                        Order
                    </button>
                </div>
                ))}
            </div>
        </div>
    );
};

export default OrderStock;

