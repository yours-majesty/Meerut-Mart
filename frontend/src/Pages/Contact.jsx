
import Title from '../Components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../Components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} className='w-80 md:max-w-[480p]' alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-700'>Our Store</p>
          <p>54709 william Station <br/> Suite 350, Washington,USA </p>
          <p className='text-gray-500'>(+415) 555-12345 <br/> Email: admin@gmail.com</p>
          <p className='font-semibold text-xl text-gray-700'>Careers at Miet</p>
          <p className='text-gray-500'>Learn more about teams and job openings.</p>
          <button className='border-2 border-black px-8 py-2 text-sm font-semibold hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact
