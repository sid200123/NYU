import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    // not mention to use api for auth that's why using simple logic instead of using api but we can use one api to check
    const auth = localStorage.getItem('note_token') ? true : false;
  return auth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes