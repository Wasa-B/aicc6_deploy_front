import React, { useEffect, useState } from 'react'
import { MdEditDocument } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { fetchUpdateCompleted, fetchGetItems, fetchDeleteItem } from '../../redux/slices/apiSlice';
import { toast } from 'react-toastify';
import { openModal } from '../../redux/slices/modalSlice';
const Item = ({task}) => {
  const { _id, title, description, date, iscompleted, isimportant, userid } =
    task;
  const dispatch = useDispatch();

  const [isCompleted, setIsCompleted] = useState(iscompleted);

  // Modal Variable
  const handleDetailOpenModal = () => {
    dispatch(openModal({modalType: 'detail', task: task}));
  }
  const handleEditOpenModal = () => {
    dispatch(openModal({modalType: 'edit', task: task}));
  }
  useEffect(()=>{
    setIsCompleted(iscompleted);
  },[iscompleted])

  const changeCompleted = async () => {
    // setIsCompleted(!isCompleted)을 호출하면 상태 업데이트가 비동기적으로 이루어지기 때문에, isCompleted의 값이 즉시 변경되지 않는다.
    // 따라서 updateCompletedData 객체를 생성할 때 isCompleted의 이전 값이 사용된다. 이로 인해 true/false가 한 단계씩 밀리게 된다.

    // 상태를 미리 업데이트 하여 반영된 값을 사용
    const newIsCompleted = !isCompleted;
    setIsCompleted(newIsCompleted);

    const updateCompletedKeys = {
      itemId: _id,
      isCompleted: newIsCompleted,
    };

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateCompletedKeys),
    };

    try {
      await dispatch(fetchUpdateCompleted(options)).unwrap();
      newIsCompleted
        ?toast.success("할 일을 완료 했습니다.")
        :toast.info("할 일이 진행 중 입니다.")
      
      await dispatch(fetchGetItems(userid)).unwrap();
    } catch (error) {
      toast.error('Fail to update');
    }
  };

  const textLengthOverCut = (text, length, lastText) => {
    if(!length) length = 20;
    if(!lastText) lastText = '...';
    if (text.length > length) {
      return text.substring(0, length) + lastText
    }
    return text
  }

  const handleDeleteItem = async()=>{
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if(!confirm||!_id) return;
    try {
      await dispatch(fetchDeleteItem(_id));
      toast.success("아이템 삭제 완료")
      await dispatch(fetchGetItems(userid));
    } catch (error) {
      console.log("Error:", error);
      toast.error("아이템 삭제 실패");
    }
  }

  // console.log(item);
  return (
    <div className='item w-1/3 h-[25vh] p-[0.25rem]'>
      <div className="w-full h-full border border-gray-500 rounded-md flex py-3 px-4 flex-col justify-between bg-gray-950">
        <div className="item-upper">
          <h2 className="item-title text-xl font-normal mb-3 relative pb-2 flex justify-between border-b-[1px] border-gray-500">
            <span className=''>{title}</span>
            <span
              onClick={handleDetailOpenModal} 
              className='text-sm py-1 px-3 border border-gray-500 rounded-sm hover:bg-gray-700 cursor-pointer'>
              자세히
              </span>
          </h2>
          <p className="item-description">
            {textLengthOverCut(description)}
          </p>
        </div>
        <div className="item-lower">
          <p className='item-date text-sm mb-1'>{date}</p>
          <div className='item-footer flex justify-between'>
            <div className='item-footer-left flex gap-2'>
              {
                isCompleted
                ?(<button className="item-competed block py-1 px-4 bg-lime-600 text-sm text-white rounded-md" onClick={changeCompleted}>Completed</button>)
                :(<button className="item-competed block py-1 px-4 bg-cyan-600 text-sm text-white rounded-md" onClick={changeCompleted}>Incompleted</button>)
              }
              {
                isimportant
                ?(<button className="item-important block py-1 px-4 bg-red-600 text-sm text-white rounded-md">Important</button>)
                :("")
              }
            </div>
            <div className='item-footer-right flex gap-2'>
              <button onClick={handleEditOpenModal}><MdEditDocument className='w-5 h-5'/></button>
              <button onClick={handleDeleteItem}><FaTrash/></button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Item
