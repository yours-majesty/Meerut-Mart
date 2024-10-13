import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SellerForm = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        contactNumber: '', 
        shopLocation: '',
        email: '', 
        password: '', 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
        console.log('Token before sending request:', token);
        if (!token) {
            toast.error("Authentication token is missing");
            console.log("Token is missing");
            return; 
        }
    
        try {
            const response = await axios.post(
                `${backendURL}/api/become-seller`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  
                    },
                }
            );
            console.log('Seller created:', response.data);
            toast.success("Seller has been created");
            navigate('/sell-item');
        } catch (error) {
            console.error('Error creating seller:', error.response ? error.response.data : error.message);
            toast.error("Failed to create seller. Please try again.");
        }
    };
    
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-semibold text-center mb-4">Become a Seller</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="shopLocation" className="block text-sm font-medium text-gray-700">Shop Location:</label>
                    <input
                        type="text"
                        id="shopLocation"
                        name="shopLocation"
                        value={formData.shopLocation}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none p-2"
                    />
                </div>

                <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number:</label>
                    <input
                        type="text"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none p-2"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none p-2"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none p-2"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SellerForm;
