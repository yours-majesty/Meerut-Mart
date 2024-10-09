import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const SellItem = () => {
  const backendURL=import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    shopName: '',
    productName: '',
    productPhotos: [],
    productQuantity: 0,
    productPrice: 0,
    productCategory: '',
    productSubCategory: '',
    vendorNumber: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 4) {
      alert('You can upload a maximum of 4 photos.');
      e.target.value = ''; // Clear the input field
    } else {
      setFormData({
        ...formData,
        productPhotos: e.target.files
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('shopName', formData.shopName);
    data.append('productName', formData.productName);
    data.append('productQuantity', formData.productQuantity);
    data.append('productPrice', formData.productPrice);
    data.append('productCategory', formData.productCategory);
    data.append('productSubCategory', formData.productSubCategory);
    data.append('vendorNumber', formData.vendorNumber);

    // Add each photo to FormData
    Array.from(formData.productPhotos).forEach(photo => {
      data.append('productPhotos', photo);
    });

    try {
      const response = await axios.post(`${backendURL}/api/sell-item`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Item successfully submitted:', response.data);
      toast.success('Item submitted successfully!'); // Show success toast
    } catch (error) {
      console.error('Error submitting item:', error);
      toast.error('Error submitting item. Please try again.'); // Show error toast
    }
  };

  return (
    <div className="bg-gray-100 p-10">
      <ToastContainer /> {/* Include ToastContainer here */}
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Vendor Product Submission Form</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Shop Name */}
          <div className="mb-4">
            <label htmlFor="shopName" className="block text-sm font-medium text-gray-700">Shop Name</label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Product Name */}
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Product Photos */}
          <div className="mb-4">
            <label htmlFor="productPhotos" className="block text-sm font-medium text-gray-700">Product Photos</label>
            <input
              type="file"
              id="productPhotos"
              name="productPhotos"
              accept="image/*"
              multiple
              required
              className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              onChange={handleFileChange}
            />
            <p className="text-xs text-gray-500 mt-2">You can upload up to 4 photos.</p>
          </div>

          {/* Product Quantity */}
          <div className="mb-4">
            <label htmlFor="productQuantity" className="block text-sm font-medium text-gray-700">Product Quantity</label>
            <input
              type="number"
              id="productQuantity"
              name="productQuantity"
              value={formData.productQuantity}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Product Price */}
          <div className="mb-4">
            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Product Price (₹)</label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Product Category */}
          <div className="mb-4">
            <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">Product Category</label>
            <select
              id="productCategory"
              name="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Product Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              {/* Add other categories here */}
            </select>
          </div>

          {/* Vendor Mobile Number */}
          <div className="mb-4">
            <label htmlFor="vendorNumber" className="block text-sm font-medium text-gray-700">Vendor Mobile Number</label>
            <input
              type="text"
              id="vendorNumber"
              name="vendorNumber"
              value={formData.vendorNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-md shadow-md hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellItem;
