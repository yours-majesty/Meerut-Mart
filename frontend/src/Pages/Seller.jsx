

const Form = () => {
  // const [productPhotos, setProductPhotos] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 4) {
      alert('You can upload a maximum of 4 photos.');
      e.target.value = ''; // Clear the input field
    } else {
      // setProductPhotos(e.target.files);
    }
  };

  return (
    <div className="bg-gray-100 p-10">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Vendor Product Submission Form
        </h2>

        <form action="/submit-vendor-product" method="POST" encType="multipart/form-data">
          
          {/* Shop Name */}
          <div className="mb-4">
            <label htmlFor="shopName" className="block text-sm font-medium text-gray-700">
              Shop Name
            </label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              placeholder="Enter your shop name"
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Product Name */}
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="Enter the product name"
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Product Photos */}
          <div className="mb-4">
            <label htmlFor="productPhotos" className="block text-sm font-medium text-gray-700">
              Product Photos
            </label>
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
            <p className="text-xs text-gray-500 mt-2">
              You can upload up to 4 photos.
            </p>
          </div>
{/* Product Quantity */}
          <div className="mb-4">
            <label htmlFor="productQuantity" className="block text-sm font-medium text-gray-700">
              Product Quantity
            </label>
            <input
              type="number"
              id="productQuantity"
              name="productQuantity"
              placeholder="Enter the quantity available"
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Product Price */}
          <div className="mb-4">
            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
              Product Price (₹)
            </label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              placeholder="Enter the price per unit"
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
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Product Category</option>
              <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Mitti ke Diye">Mitti ke Diye</option>
            <option value="Mitti ke Bartan">Mitti ke Bartan</option>
            <option value="Muda Chair">Muda Chair</option>
            <option value="Genda Phool">Genda Phool</option>
            </select>
          </div>

          {/* Product Sub-Category */}
          <div className="mb-4">
            <label htmlFor="product sub-Category" className="block text-sm font-medium text-gray-700">Product Sub-Category</label>
            <select
              id="product sub-Category"
              name="product sub-Category"
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Product Sub-Category</option>
              <option value="Bottomwear">Bottomwear</option>
            <option value="Topwear">Topwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="Earthen">Earthen</option>
            <option value="Silver">Silver</option>
            <option value="Non-Sticky">Non-Sticky</option>
            <option value="Metal">Metal</option>
            <option value="Engineered Wood">Engineered Wood</option>
            <option value="Bamboo">Bamboo</option>
            <option value="Non-Coated">Non-Coated</option>
            <option value="Genda Phool">Genda Phool</option>
            </select>
          </div>

          {/* Vendor mobile number*/}
          <div className="mb-4">
            <label htmlFor="vendor-no" className="block text-sm font-medium text-gray-700">
              Vendor Mobile Number
            </label>
            <input
              type="number"
              id="vendor-no"
              name="vendor-no"
              placeholder="Enter Your Mobile Number"
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
