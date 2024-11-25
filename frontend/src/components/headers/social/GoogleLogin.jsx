import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function GoogleLogin() {
    const {googleLogin, error, loader}=useAuth();
    const navigate=useNavigate()
    const handleLogin = async () => {
        try {
            const user = await googleLogin(); // Get user object from login
            if(user)
            {
                const userImp={
                    name: user.displayName,
                    email:user.email,
                    photoURL:user.photoURL,
                    role:'user',
                    gender:"Is not specified",
                    address:"Is not specified",
                    phone:"Is not specified"

                };
                if(user.email && user.displayName)
                {
                    return axios.post('http://localhost:4000/new-user',userImp).then(()=>
                    {
                        navigate('/');
                        return "Registration Successfull"
                    }).catch((err)=>{
                        throw new Error(err);
                    })
                }
            }
        } catch (error) {
            console.error("Login Error:", error); // Handle login errors if needed
        }
    };
  return (
    <div className="flex items-center justify-center my-3">
      <button onClick={()=>handleLogin()} className="flex items-center outline-none bg-white border border-gray-300 rounded-lg shadow px-8 py-4 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none">
         <FcGoogle className="h-6 w-6 mr-2" />
        <span>Continue with Google</span>
      </button>
    </div>
  )
}

export default GoogleLogin
