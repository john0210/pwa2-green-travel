import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosConfig from "../../configs/axiosConfig.js";

const stayIndex = createAsyncThunk(
  'staylSlice/stayIndex',
  async (arg, thunkAPI) => {
    // state 접근 방법
    const state = thunkAPI.getState();
    

    const url = `${axiosConfig.BASE_URL}/searchStay2`;
    const config = {
     params: {
      numOfRows: axiosConfig.NUM_OF_ROWS,
      pageNo: state.stay.page + 1, 
      MobileOS : axiosConfig.MOBILE_OS,
      MobileApp : axiosConfig.MOBILE_App,
      serviceKey: axiosConfig.SERVICE_KEY,
      _type: axiosConfig.TYPE,
      arrange: axiosConfig.ARRANGE,
    },
 
  }
  // config 내부의 params로 수업, 익숙해지면, 디스트럭처링 문법

    const response = await axios.get(url, config);

    return response.data.response.body;
  }
);

export {stayIndex};