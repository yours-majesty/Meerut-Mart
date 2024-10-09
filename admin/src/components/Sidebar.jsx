
import { NavLink } from 'react-router-dom'
import { assets } from '../admin_assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-black'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink className='flex items-center gap-3 border border-black border-r-0 px-3 py-2 rounded-l' to='/add'>
            <img className='w-5 h-5' src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Add Items</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-black border-r-0 px-3 py-2 rounded-l' to='/list'>
            <img className='w-5 h-5' src={assets.order_icon} alt="" />
            <p className='hidden md:block'>List Items</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-black border-r-0 px-3 py-2 rounded-l' to='/orders'>
            <img className='w-5 h-5' src={assets.order_icon} alt="" />
            <p className='hidden md:block'>orders</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-black border-r-0 px-3 py-2 rounded-l' to='/user-list'>
            <img className='w-5 h-5' src={assets.order_icon} alt="" />
            <p className='hidden md:block'>All Users</p>
        </NavLink>
        
          <NavLink className='flex items-center gap-3 border border-black border-r-0 px-3 py-2 rounded-l' to='/display-product'>
            <img className='w-5 h-5' src={assets.order_icon} alt="" />
            <p className='hidden md:block'>Display Product</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
