import { createContext, useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₹';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('OOPS! Please select a size.');
      return;
    }

    let cartData = structuredClone(cartItems); // Cloning cartItems
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1; // Increment quantity
      } else {
        cartData[itemId][size] = 1; // New size
      }
    } else {
      cartData[itemId] = { [size]: 1 }; // New item
    }

    toast.success("Item added to Cart");
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, { itemId, size },  { headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        console.error(error);
        toast.error('Error adding item to cart: ' + error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        console.error(error);
        toast.error('Error updating quantity: ' + error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find(product => product._id === items);
      if (!itemInfo) continue; // Check if itemInfo exists
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      }
    }
    return totalAmount + delivery_fee; // Include delivery fee
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`,{ headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching products: ' + error.message);
    }
  };

  const getUserCart = async (token) => {
    console.log("Requesting user cart with token:", token); // Log the token
    try {
      const response = await axios.post(`${backendUrl}/api/cart/get`, {},{ headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error('Error fetching user cart:', error.response ? error.response.data : error.message);
      toast.error('Error fetching user cart: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    console.log(localToken);
    if (localToken) {
      setToken(localToken);
      getUserCart(localToken);
    }
  }, []); // Fetch user cart without depending on token

  const value = useMemo(() => ({
    products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch,
    cartItems, setCartItems, addToCart, getCartCount, updateQuantity, getCartAmount,
    navigate, backendUrl, setToken, token
  }), [products, currency, delivery_fee, search, showSearch, cartItems, token]);

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
