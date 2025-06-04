import React, { useEffect, useState } from 'react'
import Item from './Item';
import { useDispatch, useSelector } from 'react-redux';
import AddItem from './AddItem';
import PageTitle from './PageTitle';
import { fetchGetItems } from '../../redux/slices/apiSlice';
import { SkeletonTheme } from 'react-loading-skeleton';
import LoadingSkeleton from './LoadingSkeleton';
import ItemModal from './ItemModal';
import Modal from './Modal';


// 1. home 메뉴를 서택할 때:
// - all메뉴를 선택하면 첫번째 filter 조건이 true이므로 모든 task를 반환
// - 1번에서 반환된 모든 tasks를 대상으로 두번째 filter 조건을 적용
// - filterImportant가 undefined이면 조건이 true 이므로 모든 task를 반환


// 2. Completed 메뉴를 선택할 때:
// - 첫번째 필터 조건에서 if문이 false이므로 return 문으로 이동하여 filterCompleted 조건을 판단
// - filterCompleted가 true이면 task.iscompleled가 true인 task만 반환


// 3. Proceeding 메뉴를 선택할 때:
// - 첫번째 필터 조건에서 if문이 false이므로 return 문으로 이동하여 filterCompleted 조건을 판단
// - filterCompleted가 false이면 task.iscompleled가 false인 task만 반환


// 4. Important 메뉴를 선택할 때:
// - 첫번째 필터 조건에서 if문이 true이므로 두번째 필터 조건으로 이동
// - 두번째 filter 조건에서 filterImportant가 없으면 true이므로 모든 task를 반환(home, Completed, Proceeding과 동일)
// - filterImportant가 true이면 task.isimportant가 true인 task만 반환

const ItemPanel = ({pageTitle, itemFilter}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  // Auth Data Variable
  const authData = useSelector((state) => state.auth.authData);
  const userKey = authData?.sub;

  // API Data Variable
  const getItemsData = useSelector((state) => state.api.getItemsData);

  // Modal Variable
  const isOpen = useSelector((state) => state.modal.isOpen);
  console.log(isOpen);
  useEffect(()=>{
    if(!userKey)return;
    if(getItemsData != null){
      setIsLoading(false);
      return;
    }
    // useEffect 내부에서 dispatch 함수를 호출할 때는 async/await를 사용할 수 없을때 unwrap()을 사용;
    const fetchGetItemsData = async ()=>{
      try {
        await dispatch(fetchGetItems(userKey)).unwrap();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGetItemsData();
  },[userKey]);


  const filterItems = ()=>{
    if(!itemFilter) return getItemsData;
    return getItemsData?.filter(itemFilter);
  }
  // console.log(getItemsData);
  return (
    <div className='panel bg-[#212121] w-[80%] rounded-lg border border-gray-500 py-5 px-4
    flex flex-col gap-4 overflow-y-auto
    '>
      {isOpen && <Modal />}
      {
        userKey
        ? (
          <div className='login-message w-full h-full'>
            <PageTitle title={pageTitle} />
            <div className="items-wrapper
            w-full h-auto flex flex-wrap justify-start items-start">
                {
                  isLoading
                  ?(
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                      {Array.from({length: 5}).map((_, idx)=>(
                        <LoadingSkeleton key={idx}/>
                      ))}
                    </SkeletonTheme>
                  )
                  :(
                    <>
                    {
                      filterItems()?.map((task)=>(
                        <Item key={task._id} task={task}/>
                      ))
                    }
                    <AddItem  />
                    </>
                  )
                }
                <div className="add-item">
              </div>
            </div>
          </div>
        )
        :(
          <div className="login-message w-full h-full flex items-center justify-center">
            <button className="flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-2 px-4 rounded-md">
              <span className="text-sm font-semibold">
                로그인이 필요한 서비스 입니다.
              </span>
            </button>
          </div>
        )
      }
    </div>
  )
}

export default ItemPanel
