import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../configs/axiosConfig.js";
import axios from "axios";
import { dateCalculater } from "../../utils/dateCalculater.js";
import { dateFormatter } from "../../utils/dateFormatter.js";

const festivalIndex = createAsyncThunk(
  'festivalSlice/festivalIndex',
  async (arg, thunkAPI) => {
    // state 접근 방법
    const state = thunkAPI.getState();
    const pastDateYMD = dateFormatter.formatDateToYMD(dateCalculater.getPastDate((1000*60*60*24*30)));

    const url = `${axiosConfig.BASE_URL}/searchFestival2`;
    const config = {
     params: {
      serviceKey: axiosConfig.SERVICE_KEY,
      MobileOS : axiosConfig.MOBILE_OS,
      MobileApp : axiosConfig.MOBILE_App,
      _type: axiosConfig.TYPE,
      arrange: axiosConfig.ARRANGE,
      numOfRows: axiosConfig.NUM_OF_ROWS,
      eventStartDate: pastDateYMD,
      pageNo: state.festival.page + 1,
    }
  }
  // config 내부의 params로 수업, 익숙해지면, 디스트럭처링 문법

    const response = await axios.get(url, config);

    return response.data.response.body;
  }
);

export {festivalIndex};