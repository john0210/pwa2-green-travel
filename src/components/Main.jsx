import { useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const navigate = useNavigate();
  return(
    <>
      <img className='title-img' onClick={() => { navigate ('/festivals')}} src='/base/1-1.jpg' alt="대문상" />
      <img className='title-second-img' onClick={() => { navigate ('/stays')}} src='/base/1-2.jpg' alt="대문하" />
    </>
  )
}

export default Main;