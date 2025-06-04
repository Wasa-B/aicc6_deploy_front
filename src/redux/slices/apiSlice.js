import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ADD_TASK_API_URL, DELETE_TASK_API_URL, GET_TASKS_API_URL, UPDATE_COMPLETED_TASK_API_URL, UPDATE_TASK_API_URL } from '../../utils/apiUrl';
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from '../../utils/requests';

const getItemsFetchThunk = (actionType, apiUrl)=>{
  return createAsyncThunk(actionType, async (userId)=>{
    const fullPath = `${apiUrl}/${userId}`;
    return await getRequest(fullPath);
  });
}

const updateCompletedFetchThunk = (actionType, apiUrl) => {
  return createAsyncThunk(actionType, async (options) => {
    // console.log(options)
    return await patchRequest(apiUrl, options);
  });
};

const postItemFetchThunk = (actionType, apiUrl)=>{
  return createAsyncThunk(actionType, async (postData)=>{
    const options = {
      body: JSON.stringify(postData)
    }
    return await postRequest(apiUrl, options);
  })
}

const putItemFetchThunk = (actionType, apiUrl)=>{
  return createAsyncThunk(actionType, async (updateData)=>{
    const options = {
      body: JSON.stringify(updateData)
    }
    return await putRequest(apiUrl, options);
  })
}

const deleteItemFetchThunk = (actionType, apiUrl)=>{
  return createAsyncThunk(actionType, async(itemId)=>{
    const fullPath = `${apiUrl}/${itemId}`;
    return await deleteRequest(fullPath);
  });
}


export const fetchPostItem= postItemFetchThunk('fetchPostItem', ADD_TASK_API_URL);
export const fetchGetItems = getItemsFetchThunk('fetchGetItems', GET_TASKS_API_URL);
export const fetchDeleteItem = deleteItemFetchThunk('fetchDeleteItem', DELETE_TASK_API_URL);
export const fetchUpdateCompleted = updateCompletedFetchThunk('fetchUpdateCompleted', UPDATE_COMPLETED_TASK_API_URL);
export const fetchUpdateTask = putItemFetchThunk('fetchUpdateTask', UPDATE_TASK_API_URL);

const handleFulFilled = (stateKey)=>{
  return (state, action)=>{
    state[stateKey] = action.payload;
  }
}

const handleRejected = (state, action)=>{
  console.log("error",action);
}

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    getItemsData: null,
    updateCompletedData: null,
    postItemData:null,
    deleteItemData:null,
    updateTaskData:null
  },
  extraReducers: (builder)=>{
    builder
      .addCase(fetchGetItems.fulfilled, handleFulFilled("getItemsData"))
      .addCase(fetchGetItems.rejected, handleRejected)
      .addCase(fetchUpdateCompleted.fulfilled, handleFulFilled("updateCompletedData"))
      .addCase(fetchUpdateCompleted.rejected, handleRejected)
      .addCase(fetchPostItem.fulfilled, handleFulFilled("postItemData"))
      .addCase(fetchPostItem.rejected, handleRejected)
      .addCase(fetchDeleteItem.fulfilled, handleFulFilled("deleteItemData"))
      .addCase(fetchDeleteItem.rejected, handleRejected)
      .addCase(fetchUpdateTask.fulfilled, handleFulFilled("updateTaskData"))
      .addCase(fetchUpdateTask.rejected, handleRejected);
  }
});

export default apiSlice.reducer;