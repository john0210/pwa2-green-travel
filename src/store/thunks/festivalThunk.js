import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../configs/axiosConfig";
import axios from "axios";

const festivalIndex = createAsyncThunk(
  'festivalSlice/festivalIndex',
  async () => {
    const url = `${axiosConfig.baseUrl}/searchFestival2`;
    const config = {
     params: {
      serviceKey: axiosConfig.serviceKey,
      MobileOS : axiosConfig.MobileOS,
      MobileApp : axiosConfig.MobileApp,
      _type: axiosConfig.type,
      arrange: axiosConfig.arrange,
      eventStartDate: '20250401',
    }
  }
  // config 내부의 params로 수업, 익숙해지면, 디스트럭처링 문법

    const response = await axios.get(url, config);

    return response.data.response.body;
  }
);

export {festivalIndex};