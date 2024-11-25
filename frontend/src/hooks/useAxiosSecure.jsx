import { useContext, useEffect } from "react"
import { AuthContext } from "../utilities/provider/Authprovider"
import { useNavigate } from "react-router-dom";
import axios from "axios";


function useAxiosSecure() {
const {logout}=useContext(AuthContext);
const navigate=useNavigate();

const axiosSecure=axios.create(
  {
    baseURL: 'http://localhost:5173'
  }
);

useEffect(()=>{
  // Add a request interceptor
  const requestInterceptor=axiosSecure.interceptors.request.use((config)=>
  {
    const token=localStorage.getItem('token');
    if(token)
    {
      config.headers.Authorization=`Bearer ${token}`;
     }
    return config;
  })

  // Add a response interceptor
  const responseInterceptor=axiosSecure.interceptors.response.use((response)=> response,async(error)=>
  {
    if(error.response && (error.response.status===401 || error.response.status===404))
    {
      await logout();
      navigate('/login');
      throw error
    }
    throw error;
  })

  return ()=>
  {
    axiosSecure.interceptors.request.eject(requestInterceptor);
    axiosSecure.interceptors.response.eject(responseInterceptor);
  }
},[logout,navigate,axiosSecure])

return axiosSecure;

}

export default useAxiosSecure
