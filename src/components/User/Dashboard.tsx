import React, { useState } from 'react'
import { fetchUserData } from '../../Services/AuthService';
import toast from 'react-hot-toast';

const UserDashboard = () => {

  const [userData, setUserData] = useState<string>("");

  const handleFetchData = async () =>{
    try {
      const result = await fetchUserData();
      // console.log(result);
      setUserData(result);
    } catch (error: any) {
    const errorMessage =
      error?.response?.data?.error ||   // backend message
      error?.message ||                   // axios/network error
      "Failed to fetch data!";             // fallback
    toast.error(errorMessage);
    console.error(error);
  }
};

  return (
    <div>
      <h1>User Dashboard</h1>
      <h1>User Data - {userData}</h1>
      <button onClick={handleFetchData}>Fetch User Data</button>
    </div>
  )
}

export default UserDashboard
