import { useDispatch, useSelector } from 'react-redux';
import './FestivalList.css';
import { useEffect } from 'react';
import { setScrollEventFlg } from '../../store/slices/festivalSlice.js';
import { festivalIndex } from '../../store/thunks/festivalThunk.js';
import { dateFormatter } from '../../utils/dateFormatter.js'; 

function FestivalList() {
  const dispatch = useDispatch();

  const festivalList = useSelector(state => state.festival.list);
  const page = useSelector(state => state.festival.page);
  const scrollEventFlg = useSelector(state => state.festival.scrollEventFlg);
  
  useEffect(() => {
    dispatch(festivalIndex(1));
  }, []);

  // 페이지가 변경되었을 때, 재실행 (아래)

  useEffect(() => {
    window.addEventListener('scroll', addNextPage);


    return () => {
    window.removeEventListener('scroll', addNextPage);
    }
  }, [page, scrollEventFlg]);

  // 다음 페이지 가져오기
  function addNextPage() {
    // 스크롤 관련 처리
    const docHeight = document.documentElement.scrollHeight; //문서의 Y축 총 길이
    const winHeight = window.innerHeight; // 윈도우의 Y축 총 길이
    const nowHeight = window.scrollY; //현재 스크롤의 Y축 위치
    const viewHeight = docHeight - winHeight; // 스크롤을 끝까지 내렸을 때의 Y축 위치


    if(viewHeight === nowHeight && scrollEventFlg) {
    dispatch(setScrollEventFlg(false));  
    dispatch(festivalIndex(page + 1));
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