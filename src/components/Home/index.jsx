import React from 'react'
import NavBar from '../Common/NavBar'
import ItemPanel from '../Common/ItemPanel'
const index = () => {
  return (
    <div className='page-section'>  
      <NavBar/>
      <ItemPanel 
        pageTitle="All Items" 
      />
    </div>
  )
}

export default index
