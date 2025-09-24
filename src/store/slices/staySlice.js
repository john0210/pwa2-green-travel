import { createSlice } from "@reduxjs/toolkit";
import { stayIndex } from "../thunks/stayThunk.js";
import { localStorageUtil } from "../../utils/localStorageUtil.js";

const staySlice = createSlice({
  name: 'staySlice',
  initialState: {
    // 페스트벌 리스트 저장
    // list: null, // 페스티벌 리스트
    list: localStorageUtil.getStayList() ? localStorageUtil.getStayList() : [], // 스테이 리스트
    page: localStorageUtil.getStayPage() ? localStorageUtil.getStayPage() : 0, // 현재 페이지 번호(초기값1)
    scrollEventFlg: localStorageUtil.getStayScrollFlg() ? localStorageUtil.getStayScrollFlg() : true, // 스크롤 이벤트 디바운싱 제어 플래그
  },
  reducers: {
    setScrollEventFlg: (state, action) => {
      state.scrollEventFlg = action.payload;
    }
    // setList(state, action) {
    //   state.list = action.payload;
    // }
  },
  extraReducers: builder => {
    builder 
      .addCase(stayIndex.fulfilled, (state, action) => {
        // console.log(action.payload, action.type);
        // state.list = action.payload.items.item;
        // if(state.list !== null) {
        //   // 페이지 추가 처리
        //   state.list = [...state.list, ...action.payload.items.item];
        //   state.page = action.payload.pageNo;
        // } else {
        //   // 초기 페이지 처리
        //   state.list = action.payload.items.item;
        // state.page = action.payload.pageNo;
        // }
        if(action.payload.items?.item) {
          
          // state 저장(재할당)
          state.list = [...state.list, ...action.payload.items.item];
          state.page = action.payload.pageNo;

          // localstorage 저장
          localStorageUtil.setStayList(state.list);
          localStorageUtil.setStayPage(state.page);
          localStorageUtil.setStayScrollFlg(state.scrollEventFlg);
          state.scrollEventFlg = true;
        } else {
          state.scrollEventFlg = false;
        }

      })
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          console.error('에러에러.', action.error);
        }
      );
  }
});

export const {setScrollEventFlg} = staySlice.actions;


export default staySlice.reducer;