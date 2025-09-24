import { useNavigate, useParams } from "react-router-dom";
import './StayShow.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setStayInfo } from "../../store/slices/stayShowSlice.js";

function StayShow() {
  const dispatch = useDispatch();
  const stayInfo = useSelector(state => state.stayShow.stayInfo);
  const params = useParams();
  const navigate = useNavigate();
  const stayList = useSelector(state => state.stay.list);
  
 

  useEffect(() => {
    const item = stayList.find(item => params.id === item.contentid);
    dispatch(setStayInfo(item));
    }, []);

  function redirectBack() {
    navigate(-1);
  }

  return (
    <>
     { 
     stayInfo.title && 
     <div className="show-container">
        <button type="button" onClick={redirectBack}>되돌아가기</button>
        <p className="show-title">{stayInfo.title}</p>
        <p className="show-tel">{`${stayInfo.tel !== '' ? stayInfo.tel : '전화번호 없음'}`}</p> 
          {/* {stayInfo.tel !== '' ? stayInfo.tel : '전화번호 없음'} */}
        <img className="show-img" src={stayInfo.firstimage} alt={`${stayInfo.title}사진`}/>
        <p className="show-addr">{`${stayInfo.addr1}, ${stayInfo.addr2}`}</p>
     </div> 
     }
    </>
  )
}

export default StayShow;