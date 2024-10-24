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

    if (!token) {
      toast.error("Login first");
      return; 
    }

    try {
      const updatedCart = { ...cartItems }; // Create a shallow copy of cartItems
      if (updatedCart[itemId]) {
        updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1; // Increment or initialize quantity
      } else {
        updatedCart[itemId] = { [size]: 1 }; // New item
      }

      setCartItems(updatedCart);
      toast.success("Item added to Cart");

      // Send cart data to the backend
      await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
      console.error(error);
      toast.error('Error adding item to cart: ' + error.message);
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, itemSizes) => {
      return total + Object.values(itemSizes).reduce((count, qty) => count + qty, 0);
    }, 0);
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const updatedCart = { ...cartItems, [itemId]: { ...cartItems[itemId], [size]: quantity } };
    setCartItems(updatedCart);

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
    return Object.keys(cartItems).reduce((totalAmount, itemId) => {
      const itemInfo = products.find(product => product._id === itemId);
      if (!itemInfo) return totalAmount; // Check if itemInfo exists
      
      const itemTotal = Object.keys(cartItems[itemId]).reduce((amount, size) => {
        return amount + (itemInfo.price * cartItems[itemId][size]);
      }, 0);
      
      return totalAmount + itemTotal;
    }, delivery_fee); // Include delivery fee
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, { headers: { Authorization: `Bearer ${token}` } });
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

  const getUserCart = async () => {
    if (!token) return; // Early return if there's no token

    try {
      const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error('Error fetching user cart:', error);
      toast.error('Error fetching user cart: ' + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setToken(localToken);
      getUserCart(localToken);
    }
  }, []); // Fetch user cart without depending on token

  const value = useMemo(() => ({
    products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch,
    cartItems, setCartItems, addToCart, getCartCount, updateQuantity, getCartAmount,
    navigate, backendUrl, setToken, token
  }), [products, search, showSearch, cartItems, token]);

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

