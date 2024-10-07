import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const {search,setSearch,showSearch,setShowSearch,navigate}=useContext(ShopContext);
    const [visible,setVisible]=useState(false);
    const location=useLocation();

    useEffect(()=>{
        if (location.pathname.includes('collection')) {
            setVisible(true);
        }
        // My addition starts here
        // if (location.pathname.includes('')) {
            
        //     setVisible(true);
        // }
        // // My addition ends Here
        // else{
        //     setVisible(false);
        // }
    },[location])


  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:1/2'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm' />
        <img src={assets.search_icon} className='w-4' alt="" />
      </div>
      <img src={assets.cross_icon} className='inline w-3 cursor-pointer' onClick={()=> setShowSearch(false)} alt="" />
    </div>
  ) : null;
}

export default SearchBar
