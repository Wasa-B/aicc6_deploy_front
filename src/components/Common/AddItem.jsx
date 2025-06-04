import React from 'react'
import { IoAddCircleOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slices/modalSlice';
const AddItem = () => {
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    dispatch(openModal({modalType:"create"}));
  }

  return (
    <div className='item w-1/3 h-[25vh] p-[0.25rem]'>
      <div className="w-full h-full border border-gray-500 rounded-md 
      flex py-3 px-4 justify-center items-center">
        <button onClick={handleOpenModal} className='flex flex-col justify-center items-center gap-2 text-gray-400 hover:text-gray-100 animate-all duration-300'>
          <IoAddCircleOutline className='w-8 h-8 font-light'/>
          <span className='text-sm font-light'>할 일 추가하기</span>
        </button>
      </div>
    </div>
  )
}

export default AddItem
