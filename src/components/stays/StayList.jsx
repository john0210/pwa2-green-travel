import { useDispatch, useSelector } from 'react-redux';
import './StayList.css';
import { useEffect } from 'react';
import { setScrollEventFlg } from '../../store/slices/staySlice.js';
import { stayIndex } from '../../store/thunks/stayThunk.js';
import { useNavigate } from 'react-router-dom';


function StayList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stayList = useSelector(state => state.stay.list);
  // const page = useSelector(state => state.festival.page);
  const scrollEventFlg = useSelector(state => state.stay.scrollEventFlg);
  
  useEffect(() => {
    window.addEventListener('scroll', addNextPage);
    // 로컬 스토리지에 저장된 날짜를 획득
    //  저장된 날짜 없으면 로컬스토리에 현재 날짜 저장
    //  저장된 날짜 있으면 아래 처리 속행
    //   오늘 날짜랑 비교
    //    날짜가 과거면 로컬 스토리지 및 스테이트 초기화
    //    아직 과거가 아니면 처리속행(그 다음 처리를 이어간다) ----> 숙제(전체가 유동적 한 덩어리)

    // const today = dateFormatter.formatDateToYMD(new Date());
    // const savedDate = localStorage.getItem("festivalDate");

    // if (!savedDate) {
    //   // 저장된 날짜 없으면 오늘 날짜 저장
    //   localStorage.setItem("festivalDate", today);
    // } else {
    //   // 저장된 날짜 있으면 오늘 날짜와 비교
    //   if (savedDate < today) {
    //     localStorage.removeItem("festivalDate");
    //     localStorage.setItem("festivalDate", today);
    //   } 
    // }

// -------------------------------------- 숙제

    if(stayList.length === 0) {
       dispatch(stayIndex());
    }   

    return () => {
    window.removeEventListener('scroll', addNextPage);
    }

  }, []);

  // 페이지가 변경되었을 때, 재실행 (아래)

  // 다음 페이지 가져오기
  function addNextPage() {
    // 스크롤 관련 처리
    const docHeight = document.documentElement.scrollHeight; //문서의 Y축 총 길이
    const winHeight = window.innerHeight; // 윈도우의 Y축 총 길이
    const nowHeight = Math.ceil(window.scrollY); //현재 스크롤의 Y축 위치
    const viewHeight = docHeight - winHeight; // 스크롤을 끝까지 내렸을 때의 Y축 위치


    if(viewHeight === nowHeight && scrollEventFlg) {
    dispatch(setScrollEventFlg(false));  
    dispatch(stayIndex());
    }   

  }

  // 상세페이지로 이동
  function redirectShow(item) {
    // dispatch(setFestivalInfo(item));
    navigate(`/stays/${item.contentid}`);
  }

return (
    <>
      <div className="container">
        {/* { 값이 있는지 없는지 체크해야됨. */}
         {
          // festivalList.length > 0 && 
          stayList.map(item => {
            return (
            <div className="card" onClick={() => { redirectShow(item) }} key={item.contentid}>
              
              <div className="card-img" style={{backgroundImage: `url('${item.firstimage}')`}}>
              </div>
              <p className="card-title">{item.title}</p>
              <p className='card-address'>{item.addr1}</p>
              {/* 선생님께서 알려주신, 조건부 랜더링 부분 */}
              <p className='card-tel'>{item.tel !== '' ? item.tel : '전화번호 없음'}</p>
            </div>
            );
          })
        }
       </div> 
      {/* <button type="button" onClick={addNextPage}>더 보기</button> */}
    </>
  )
}
export default StayList;