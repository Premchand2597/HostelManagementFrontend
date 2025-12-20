import { useEffect, useState } from 'react'
import useAuth from '../Store/GlobalState'
import { generateNewAccessToken } from '../Services/AuthService';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const OAuth2Success = () => {
    const setNewToken = useAuth((state) => state.setNewAccessToken);
    const setUserDetails = useAuth((state)=>state.setUserLoggedInDetailsForRefresh);
    const [isRefreshed, setIsRefreshed] = useState<boolean>(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isRefreshed) return;

        const getNewToken = async () => {
            try {
                setIsRefreshed(true);
                const result = await generateNewAccessToken();
                setNewToken(result.accessToken);
                setUserDetails(result.email, result.role);

                if (result.role === "ROLE_Admin") {
                  navigate("/admin/dashboard");
                } else if (result.role === "ROLE_User") {
                  navigate("/user/dashboard");
                } else {
                  navigate("/login"); // fallback
                }

            } catch (error: any) {
                const errorMessage =
                error?.response?.data?.error ||   // backend message
                error?.message ||                   // axios/network error
                "Login failed!";             // fallback
              toast.error(errorMessage);
              console.error(error);
            }finally{
                setIsRefreshed(false);
            }
        };
        getNewToken();
    }, []);

  return (
    <div className='container bg-secondary text-center mt-5 p-5'>
      <h1>Please wait...</h1>
    </div>
  )
}

export default OAuth2Success
