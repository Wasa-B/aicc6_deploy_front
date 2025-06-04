import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingSkeleton = () => {
  return (
    <div className='w-1/3 h-[25vh] p-[0.25rem]'>
      <div className="w-full h-full border border-gray-500 rounded-md flex py-3 px-4 flex-col justify-between bg-gray-950">
      <div className="item-upper">
        <Skeleton width="40%" height="30px" />
        <Skeleton width="100%" height="30px" />
        <Skeleton width="100%" height="30px" />
        </div>
        <div className="item-lower">
        <Skeleton width="30%" height="20px" />

          <Skeleton width="100%" height="30px" />
        </div>
        
      </div>
    </div>
  )
}

export default LoadingSkeleton
