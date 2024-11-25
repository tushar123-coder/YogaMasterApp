import { useContext } from "react"
import { AuthContext } from "../utilities/provider/Authprovider"


const useAuth = () => {
const auth=useContext(AuthContext);
return auth;
}

export default useAuth
