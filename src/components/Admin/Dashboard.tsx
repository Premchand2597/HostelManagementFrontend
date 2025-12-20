import React, { useState } from 'react'
import { fetchAdminData, fetchUserData } from '../../Services/AuthService';
import toast from 'react-hot-toast';

const AdminDashboard = () => {

  const [userData, setUserData] = useState<string>("");
  const [adminData, setAdminData] = useState<string>("");

  const handleFetchUserData = async () =>{
    try {
      const result = await fetchUserData();
      // console.log(result);
      setUserData(result);
    } catch (error: any) {
    const errorMessage =
      error?.response?.data?.error ||   // backend message
      error?.message ||                   // axios/network error
      "Failed to fetch user data!";             // fallback
    toast.error(errorMessage);
    console.error(error);
  }
};

const handleFetchAdminData = async () =>{
    try {
      const result = await fetchAdminData();
      // console.log(result);
      setAdminData(result);
    } catch (error: any) {
    const errorMessage =
      error?.response?.data?.error ||   // backend message
      error?.message ||                   // axios/network error
      "Failed to fetch admin data!";             // fallback
    toast.error(errorMessage);
    console.error(error);
  }
};

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h1>User Data - {userData}</h1>
      <h1>Admin Data - {adminData}</h1>
      <button className='mx-4' onClick={handleFetchUserData}>Fetch User Data</button>
      <button onClick={handleFetchAdminData}>Fetch Admin Data</button>
    </div>
  )
}

export default AdminDashboard
