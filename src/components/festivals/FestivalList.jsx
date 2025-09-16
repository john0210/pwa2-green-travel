import { useDispatch, useSelector } from 'react-redux';
import './FestivalList.css';
import { useEffect } from 'react';
import { setScrollEventFlg } from '../../store/slices/festivalSlice.js';
import { festivalIndex } from '../../store/thunks/festivalThunk.js';
import { dateFormatter } from '../../utils/dateFormatter.js'; 

function FestivalList() {
  const dispatch = useDispatch();

  const festivalList = useSelector(state => state.festival.list);
  // const page = useSelector(state => state.festival.page);
  const scrollEventFlg = useSelector(state => state.festival.scrollEventFlg);
  
  useEffect(() => {
    window.addEventListener('scroll', addNextPage);
    // 로컬 스토리지에 저장된 날짜를 획득
    //  저장된 날짜 없으면 로컬스토리에 현재 날짜 저장
    //  저장된 날짜 있으면 아래 처리 속행
    //   오늘 날짜랑 비교
    //    날짜가 과거면 로컬 스토리지 및 스테이트 초기화
    //    아직 과거가 아니면 처리속행(그 다음 처리를 이어간다) ----> 숙제 


    if(festivalList.length === 0) {
       dispatch(festivalIndex());
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
    dispatch(festivalIndex());
    }   

  }

return (
    <>
      <div className="container">
        {/* { 값이 있는지 없는지 체크해야됨. */}
         {
          // festivalList.length > 0 && 
          festivalList.map(item => {
            return (
            <div className="card" key={item.contentid + item.createdtime}>
              <div className="card-img" style={{backgroundImage: `url('${item.firstimage}')`}}>
              </div>
              <p className="card-title">{item.title}</p>
              <p className="card-period">{dateFormatter.withHyphenYMD(item.eventstartdate)} ~ {dateFormatter.withHyphenYMD(item.eventenddate)}</p>
            </div>
            );
          })
        }
       </div> 
      <button type="button" onClick={addNextPage}>더 보기</button>
    </>
  )
}
export default FestivalList;