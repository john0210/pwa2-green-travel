import { useNavigate, useParams } from "react-router-dom";
import './FestivalShow.css';
import { useSelector, useDispatch } from "react-redux";
import { dateFormatter } from "../../utils/dateFormatter.js";
import { useEffect } from "react";
import { setFestivalInfo } from "../../store/slices/festivalShowSlice.js";

function FestivalShow() {
  const dispatch = useDispatch();
  const festivalInfo = useSelector(state => state.festivalShow.festivalInfo);
  const params = useParams();
  const navigate = useNavigate();
  const festivalList = useSelector(state => state.festival.list);
  
 

  useEffect(() => {
    const item = festivalList.find(item => params.id === item.contentid);
    dispatch(setFestivalInfo(item));
    }, []);

  function redirectBack() {
    navigate(-1);
  }

  return (
    <>
     { 
     festivalInfo.title && 
     <div className="show-container">
        <button type="button" onClick={redirectBack}>되돌아가기</button>
        <p className="show-title">{festivalInfo.title}</p>
        <p className="show-period">{dateFormatter.withHyphenYMD(festivalInfo.eventstartdate)} ~ {dateFormatter.withHyphenYMD(festivalInfo.eventenddate)}</p>
        <img className="show-img" src={festivalInfo.firstimage} alt={`${festivalInfo.title}사진`}/>
        <p className="show-addr">{`${festivalInfo.addr1}, ${festivalInfo.addr2}`}</p>
     </div> 
     }
    </>
  )
}

export default FestivalShow;