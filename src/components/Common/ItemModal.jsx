import React from 'react'

const ItemModal = ({userKey}) => {
  const handleSubmit = (e)=>{
    const itemData = {
      
    }
  }
  return (
    <div>
      <form action="#" onSubmit={handleSubmit}>
        <h2 className="item-title-label">
          Title
        </h2>
        <input type="text" name='title' className="title-input" />
        <h2>Description</h2>
        <textarea name='description' className="description-input" />
        <h2>Date</h2>
        <input type="date" name='date' className="date-input" />
        <div>
          <span>isCompleted</span>
          <input type="checkbox" name='isCompleted' className="is-completed-checkbox" />
        </div>
        <div>
          <span>isImportant</span>
          <input type="checkbox" name='isImportant' className="is-important-checkbox" />
        </div>
        <div className='w-full flex justify-end'>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default ItemModal
