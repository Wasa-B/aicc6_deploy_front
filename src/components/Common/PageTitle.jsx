import React from 'react'

const PageTitle = ({title}) => {
  return (
    <div className='page-title text-2xl font-semibold py-2 w-fit mb-4 relative'>
      {title}
      <span className='under-bar w-1/3 h-[3px] bg-bray-300 left-0 top-0 absolute bottom-0 bg-gray-500'>
      </span>
    </div>
  )
}

export default PageTitle