import React, { useEffect, useState } from 'react'
import useAuth from '../Store/GlobalState'
import { generateNewAccessToken } from '../Services/AuthService';
import { useNavigate } from 'react-router';

const OAuth2Success = () => {
    const setNewToken = useAuth((state) => state.setNewAccessToken);
    const [isRefreshed, setIsRefreshed] = useState<boolean>(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isRefreshed) return;

        const getNewToken = async () => {
            try {
                setIsRefreshed(true);
                const result = await generateNewAccessToken();
                setNewToken(result.accessToken);
                navigate("/dashboard");
            } catch (error) {
                console.error("Failed to refresh token using oauth2", error);
            }finally{
                setIsRefreshed(false);
            }
        };
        getNewToken();
    }, [isRefreshed, setNewToken]);

  return (
    <div className='container bg-secondary text-center mt-5 p-5'>
      <h1>Please wait...</h1>
    </div>
  )
}

export default OAuth2Success
