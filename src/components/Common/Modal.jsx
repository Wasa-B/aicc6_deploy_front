import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/slices/modalSlice';
import { toast } from 'react-toastify';
import { fetchGetItems, fetchPostItem, fetchUpdateTask } from '../../redux/slices/apiSlice';
const Modal = () => {
  const dispatch = useDispatch();
  const {modalType, task} = useSelector((state) => state.modal);
  const userId = useSelector((state)=>state.auth.authData.sub);

  const [formData, setFormData] = useState({
    title:'',
    description:'',
    date:'',
    isCompleted:false,
    isImportant:false,
    userId: userId
  });

  useEffect(()=>{
    setFormData({
      title: task?.title,
      description:task?.description,
      date:task?.date,
      isCompleted:task?task.iscompleted:false,
      isImportant:task?task.isimportant:false,
      userId: userId
    });
  },[]);
  console.log(formData);
  const handleCloseModal = () => {
    dispatch(closeModal());
  }

  // 모달 타입에 따라 모달 내용 변경
  const showModalContents = (modalType,str1, str2, str3)=>{
    console.log(modalType)
    switch (modalType) {
      case 'detail':
        return str2;
        break;
      case 'edit':
        return str3;
        break;
      default:
        return str1;
        break;
    }
  }

  const modalTitle = showModalContents(
    modalType,
    "할일 추가하기",
    "할일 상세보기", 
    "할일 편집하기")

  const isDetail = modalType==="detail";
  const isEdit = modalType==="edit";
  const handleSubmit = async(e)=>{
    e.preventDefault();//기본 이벤트 사용안함
    if(!formData.userId){
      toast.error("잘못된 사용입니다.");
      return;
    }

    if(!formData.title){
      toast.error("제목을 입력해 주세요");
      return;
    }
    if(!formData.description){
      toast.error("내용을 입력해 주세요");
      return;
    }
    if(!formData.date){
      toast.error("날짜를 지정해 주세요");
      return;
    }
    try {
      if(isEdit){
        await dispatch(fetchUpdateTask({
          itemId:task._id,
          ...formData
        })).unwrap();
        toast.success("할일 업데이트 완료");
      }else{
        await dispatch(fetchPostItem(formData)).unwrap();
        toast.success("할일 추가 완료");
      }
      await dispatch(fetchGetItems(userId));
      dispatch(closeModal());
    } catch (error) {
      console.log("Error: ",error);
      toast.error("작업 실패");
    }
  }
  
  const handleChange=(e)=>{
    const {name, value, type, checked} = e.target;
    const tmp ={...formData}
    tmp[name] = type==="checkbox"?checked:value;
    setFormData(tmp);
  }

  return (
    <div className='modal fixed bg-black bg-opacity-50 flex items-center justify-center w-full h-full left-0 top-0 z-50'>
      <div className="form-wrapper bg-gray-700 rounded-md w-1/2 flex flex-col items-center relative p-4">
        <h2 className='text-2xl py-2 border-b border-gray-300 w-fit font-semibold'>{modalTitle}</h2>
        <form action="#" className="w-full" onSubmit={handleSubmit}>
          <div className="input-control">
            <label htmlFor="title">제목</label>
            <input type="text" id='title' name='title' onChange={handleChange} value={formData.title} className='' placeholder='제목을 입력해 주세요' {...(modalType === 'detail' && { disabled: true })}/>
          </div>
          <div className="input-control">
            <label htmlFor="description">설명</label>
            <textarea name="description" onChange={handleChange} value={formData.description} id="description" placeholder='설명을 입력해 주세요'
            {...(modalType === 'detail' && { disabled: true })}
            />
          </div>
          <div className="input-control">
            <label htmlFor="date">날짜</label>
            <input type="date" id='date' onChange={handleChange} value={formData.date} name='date'{...(modalType === 'detail' && { disabled: true })}/>
          </div>
          <div className="input-control toggler">
            <label htmlFor="isCompleted">완료 여부</label>
            <input type="checkbox" onChange={handleChange} checked={formData.isCompleted} id='isCompleted' name='isCompleted' className=''{...(modalType === 'detail' && { disabled: true })}
            />
          </div>
          <div className="input-control toggler">
            <label htmlFor="isImportant">중요 여부</label>
            <input type="checkbox" onChange={handleChange} checked={formData.isImportant} id='isImportant' name='isImportant' className=''  {...(modalType === 'detail' && { disabled: true })}/>
          </div>
          <div className="submit-btn flex justify-end">
            <button type='submit' className={`flex justify-end bg-black py-3 px-6 hover:bg-slate-900 ${modalType==='detail'?'hidden':''}`}>
              {isEdit?"수정하기":"할 일 추가하기"}
            </button>
          </div>
        </form>
        <IoMdClose className='absolute top-2 right-2 cursor-pointer' onClick={handleCloseModal} />
      </div>
    </div>
  )
}

export default Modal
