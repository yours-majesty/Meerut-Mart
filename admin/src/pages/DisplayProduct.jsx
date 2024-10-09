// DisplayProducts.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${backendURL}/api/displayproduct`);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddItem = (productId) => {
        navigate(`/add-item/${productId}`); // Adjust the route to match your application's routing
    };

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Display Products</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <li key={product._id} className="border rounded-lg shadow-md p-4 bg-white">
                        <h2 className="text-xl font-semibold">{product.productName}</h2>
                        <p className="mt-2"><strong className="font-bold">Shop Name:</strong> {product.shopName}</p>
                        <p className="mt-1"><strong className="font-bold">Quantity:</strong> {product.productQuantity}</p>
                        <p className="mt-1"><strong className="font-bold">Price:</strong> ${product.productPrice}</p>
                        <p className="mt-1"><strong className="font-bold">Category:</strong> {product.productCategory}</p>
                        {product.productSubCategory && (
                            <p className="mt-1"><strong className="font-bold">Sub-Category:</strong> {product.productSubCategory}</p>
                        )}
                        <p className="mt-1"><strong className="font-bold">Vendor Number:</strong> {product.vendorNumber}</p>
                        <div className="mt-2">
                            <strong className="font-bold">Photos:</strong>
                            <div className="flex flex-wrap mt-2">
                                {product.productPhotos.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={photo}
                                        alt={`${product.productName} - ${index}`}
                                        className="w-24 h-24 object-cover rounded-lg mr-2 mb-2"
                                        onError={(e) => {
                                            e.target.src = 'path/to/placeholder-image.jpg'; // Replace with your placeholder image path
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={() => handleAddItem(product._id)} // Pass the product ID to the function
                            className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
                        >
                            Add Item to the Website
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayProducts;

