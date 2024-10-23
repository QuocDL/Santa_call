import React from 'react'
import Mastercard from '../../assets/Mastercard.svg'
import JapanCreditBureau from '../../assets/JapanCreditBureau.svg'
import VisaCredit from '../../assets/Visa.svg'
import BinIcon from '../../assets/mdi_bin.png'
import coinIcon from "../../assets/image 2.png";

export default function Setting() {
  return (
    <div className='mt-4'>
      <div className="bg-[#00403E] inline-block py-1.5 px-3 rounded-md">
        <h3 className="text-[#CF3736] font-semibold text-xl">
          Settings
        </h3>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3  gap-5 mt-4'>
        <div className='flex flex-col gap-5 '>
          <div className=" rounded-lg overflow-hidden">
            <div className="bg-[#CF3736] px-2 py-1.5">
              <h3 className='text-white font-semibold'>Notification</h3>
            </div>
            <div className="text-[#CF3736] font-medium bg-white px-2 py-1.5">
              <ul className='flex flex-col gap-3'>
                <li>
                  <span>Notify when new templates are available</span>
                </li>
                <li>
                  <span>Notify when new templates are available</span>
                </li>
                <li>
                  <span>Notify when new templates are available</span>
                </li>
              </ul>
            </div>
          </div>
          <div className=" rounded-lg overflow-hidden">
            <div className="bg-[#CF3736] px-2 py-1.5">
              <h3 className='text-white font-semibold'>Payment method(3)</h3>
            </div>
            <div className="text-[#CF3736] font-medium bg-white px-2 py-4">
              <ul className='flex flex-col gap-4'>
                <li className='border-[1px] flex justify-between items-center border-b-[#00403E] pb-2'>
                  <div className='flex gap-2'>
                    <img src={Mastercard} alt="" />
                    <div className='flex flex-col'>
                      <span>Business card</span>
                      <span>**********567</span>
                    </div>
                  </div>
                  <img src={BinIcon} className='w-8 h-8' alt="" />
                </li>
                <li className='border-[1px] flex justify-between items-center border-b-[#00403E] pb-2'>
                  <div className='flex gap-2'>
                    <img src={JapanCreditBureau} alt="" />
                    <div className='flex flex-col'>
                      <span>Japan Credit</span>
                      <span>*********6512</span>
                    </div>
                  </div>
                  <img src={BinIcon} className='w-8 h-8' alt="" />
                </li>
                <li className='border-[1px] flex justify-between items-center border-b-[#00403E] pb-2'>
                  <div className='flex gap-2'>
                    <img src={VisaCredit} alt="" />
                    <div className='flex flex-col'>
                      <span>Employee salary</span>
                      <span>*********6562</span>
                    </div>
                  </div>
                  <img src={BinIcon} className='w-8 h-8' alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className=" rounded-lg overflow-hidden ">
          <div className="bg-[#CF3736] px-2 py-1.5">
            <h3 className='text-white font-semibold'>Add payment method</h3>
          </div>
          <div className="text-[#CF3736] font-medium bg-white px-4 py-1.5">
            <h5 className='text-lg text-[#000000]'>*Credit Card</h5>
            <form action="" className='text-[#777777]'>
              <div className='flex flex-col gap-2 mt-4 border-[1px] border-[#00403E] rounded-md py-1 px-2'>
                <label className='text-[#777777]' htmlFor="">Card number <span className='text-red-500'>*</span></label>
                <input type="text" className='outline-none ' />
              </div>
              <div className='flex flex-col gap-2 mt-4 border-[1px] border-[#00403E] rounded-md py-1 px-2'>
                <label className='text-[#777777]' htmlFor="">Expiration <span className='text-red-500'>*</span></label>
                <input type="text" className='outline-none ' />
              </div>
              <div className='flex flex-col gap-2 mt-4 border-[1px] border-[#00403E] rounded-md py-1 px-2'>
                <label className='text-[#777777]' htmlFor="">CVV <span className='text-red-500'>*</span></label>
                <input type="text" className='outline-none ' placeholder='' />
              </div>
              <p className='text-sm mt-2'><span className='text-red-500'>*</span>By choosing to save your payment information, this payment method will be selected as the default for all purchases made using our payment method including swap image and swap video. You can delete your saved payment information at any time in our settings.</p>
              <div className='flex justify-end gap-5 mt-3'>
                <button className='bg-[#00403E] text-white rounded-md font-medium py-1 px-2'>Cancel</button>
                <button className='bg-[#CF3736] text-white rounded-md font-medium py-1 px-2'>Add</button>
              </div>
            </form>
          </div>
        </div>
        <div className='flex flex-col gap-5 '>
          <div className=" rounded-lg overflow-hidden">
            <div className="bg-[#CF3736] px-2 py-1.5">
              <h3 className='text-white font-semibold'>Statistical</h3>
            </div>
            <div className="text-[#CF3736] font-medium bg-white px-2 py-1.5">
              <div className='border-b-[#CF3736] flex justify-between font-semibold  border-b-[1px]'>
                <span className='text-[#00403E]'>Time</span>
                <div className='flex gap-2 items-center border-l-[#CF3736] border-l-[1px] w-[17%] px-2'>
                  <span>-5</span>
                  <img src={coinIcon} className='w-5' alt="" />
                </div>
              </div>
              <div className=' flex justify-between font-semibold '>
                <span className='text-[#00403E] pt-1'>August 17, 2024 10:00 Am</span>
                <div className='flex gap-2 items-center border-l-[#CF3736] border-l-[1px] pt-1 w-[17%] px-2'>
                  <span>-1</span>
                  <img src={coinIcon} className='w-5' alt="" />
                </div>
              </div>
              <div className=' flex justify-between font-semibold '>
                <span className='text-[#00403E] pt-1'>August 17, 2024 10:00 Am</span>
                <div className='flex gap-2 items-center border-l-[#CF3736] border-l-[1px] pt-1 w-[17%] px-2'>
                  <span>-1</span>
                  <img src={coinIcon} className='w-5' alt="" />
                </div>
              </div>
              <div className=' flex justify-between font-semibold '>
                <span className='text-[#00403E] pt-1'>August 17, 2024 10:00 Am</span>
                <div className='flex gap-2 items-center border-l-[#CF3736] border-l-[1px] pt-1 w-[17%] px-2'>
                  <span>-1</span>
                  <img src={coinIcon} className='w-5' alt="" />
                </div>
              </div>
              <div className=' flex justify-between font-semibold '>
                <span className='text-[#00403E] pt-1'>August 17, 2024 10:00 Am</span>
                <div className='flex gap-2 items-center border-l-[#CF3736] border-l-[1px] pt-1 w-[17%] px-2'>
                  <span>-1</span>
                  <img src={coinIcon} className='w-5' alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
