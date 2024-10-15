import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../Components/Title';
import axios from 'axios';

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null; // If no token is available, don't make the request
      }
      
      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        // Empty body
        {
          headers: {
            authorization: `Bearer ${token}` // Pass the token correctly
          }
        }
      );

      console.log(response.data);

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        console.log(allOrdersItem);
        setOrderData(allOrdersItem.reverse()); // Reverse to show recent orders first
      } else {
        console.log('No orders found');
      }

    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t-[0.2px] border-b-[0.2px] border-gray-300 text-gray-900 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name.slice(0, 50)}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-600'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-2'>Payment: <span className='text-gray-600'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-600'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button className='border px-4 py-2 text-sm font-medium rounded-sm' onClick={loadOrderData}>Track Order</button>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-600 mt-4'>No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
