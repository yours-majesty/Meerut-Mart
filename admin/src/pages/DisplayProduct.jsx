import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DisplayProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${backendURL}/api/displayproduct`);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError(`Failed to fetch products: ${error.message}`);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [backendURL]);

    const addItemToWebsite = async (productId) => {
        try {
            const response = await axios.post(`${backendURL}/api/add-item-website/${ productId }` );
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error adding the item", error);
            toast.error("Error adding item to the website");
        }
    };

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Display Products</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <li key={product._id} className="border rounded-lg shadow-md p-4 bg-white">
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="mt-2"><strong className="font-bold">Description:</strong> {product.description}</p>
                        <p className="mt-1"><strong className="font-bold">Price:</strong> ${product.price}</p>
                        <p className="mt-1"><strong className="font-bold">Category:</strong> {product.category}</p>
                        {product.subCategory && (
                            <p className="mt-1"><strong className="font-bold">Sub-Category:</strong> {product.subCategory}</p>
                        )}
                        {product.sizes && product.sizes.length > 0 && (
                            <p className="mt-1"><strong className="font-bold">Sizes Available:</strong> {product.sizes.join(', ')}</p>
                        )}
                        <p className="mt-1"><strong className="font-bold">Bestseller:</strong> {product.bestseller ? "Yes" : "No"}</p>
                        <p className="mt-1"><strong className="font-bold">Date Added:</strong> {new Date(product.date).toLocaleDateString()}</p>
                        <div className="mt-2">
                            <strong className="font-bold">Images:</strong>
                            <div className="flex flex-wrap mt-2">
                                {product.image.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={photo}
                                        alt={`${product.name} - ${index}`}
                                        className="w-24 h-24 object-cover rounded-lg mr-2 mb-2"
                                        onError={(e) => {
                                            e.target.src = 'path/to/placeholder-image.jpg'; // Replace with your placeholder image path
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <button 
                            onClick={() => addItemToWebsite(product._id)}
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

