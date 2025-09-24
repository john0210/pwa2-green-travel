import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Main from "../components/Main.jsx";
import FestivalList from "../components/festivals/FestivalList.jsx";
import FestivalShow from "../components/festivals/FestivalShow.jsx";
import StayList from "../components/stays/StayList.jsx";
import StayShow from "../components/stays/StayShow.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children : [
      {
        path: '/',
        element: <Main />
      },
      {
        path: '/festivals',
        element: <FestivalList />
      },
      {
        path: '/festivals/:id',
        element: <FestivalShow />
      },
      {
        path: '/stays',
        element: <StayList />
      },
      {
        path: '/stays/:id',
        element: <StayShow />
      },
    ]
  }
]);

function Router() {
  return <RouterProvider  router={router} />
}

export default Router;