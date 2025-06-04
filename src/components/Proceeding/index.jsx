import React from 'react'
import ItemPanel from '../Common/ItemPanel'
import NavBar from '../Common/NavBar'
const index = () => {
  return (
    <div  className='page-section'>
      <NavBar/>
      <ItemPanel 
        pageTitle="Incomplete Items"  
        itemFilter={(item)=>!item.iscompleted}
      />
    </div>
  )
}

export default index
