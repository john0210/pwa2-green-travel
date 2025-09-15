import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../configs/axiosConfig";
import axios from "axios";

const festivalIndex = createAsyncThunk(
  'festivalSlice/festivalIndex',
  async (page) => {
    const url = `${axiosConfig.BASE_URL}/searchFestival2`;
    const config = {
     params: {
      serviceKey: axiosConfig.SERVICE_KEY,
      MobileOS : axiosConfig.MOBILE_OS,
      MobileApp : axiosConfig.MOBILE_App,
      _type: axiosConfig.TYPE,
      arrange: axiosConfig.ARRANGE,
      numOfRows: axiosConfig.NUM_OF_ROWS,
      eventStartDate: '20250401',
      pageNo: page,
    }
  }
  // config 내부의 params로 수업, 익숙해지면, 디스트럭처링 문법

    const response = await axios.get(url, config);

    return response.data.response.body;
  }
);

export {festivalIndex};