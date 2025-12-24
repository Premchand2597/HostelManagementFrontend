import React, { useEffect, useState } from 'react'
import { deleteUserById, fetchAdminData, fetchAllUsersData, fetchUserData } from '../../Services/AuthService';
import toast from 'react-hot-toast';
import type { RegisterType } from '../../Models/Register';
import UpdateRegisterForm from '../UpdateRegisterForm';
import Swal from 'sweetalert2';

const AdminDashboard = () => {

  const [userData, setUserData] = useState<string>("");
  const [adminData, setAdminData] = useState<string>("");
  const [fetchedData, setFetchedData] = useState<RegisterType[]>([]);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [isEditModelClicked, setIsEditModelClicked] = useState<boolean>(false);

    useEffect(()=>{
      getAllUsersData();
    }, []);

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

async function getAllUsersData(){
  try {
    const result = await fetchAllUsersData();
    setFetchedData(result);
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.error ||   // backend message
      error?.message ||                   // axios/network error
      "Failed to fetch admin data!";             // fallback
      toast.error(errorMessage);
      console.error(error);
  }
};

const handleEditClick = async (id: number) =>{
  // alert(id);
  setSelectedId(id);
  setIsEditModelClicked(true);
};

const handleDeleteClick = async (id: number) =>{

  const res = await Swal.fire({
                    title: "Are you sure?",
                    text: "This user will be permanently deleted!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#6c757d",
                    confirmButtonText: "Yes, delete",
                    cancelButtonText: "Cancel",
                    reverseButtons: true
                  });

  if (!res.isConfirmed) return;

  try {
    const result = await deleteUserById(id);
    getAllUsersData();
    toast.success(result);
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
    <>
      {/* <h1>Admin Dashboard</h1>
      <h1>User Data - {userData}</h1>
      <h1>Admin Data - {adminData}</h1>
      <button className='mx-4' onClick={handleFetchUserData}>Fetch User Data</button>
      <button onClick={handleFetchAdminData}>Fetch Admin Data</button> */}

      <UpdateRegisterForm 
      clickedId={selectedId}
      modelStatus={isEditModelClicked}
      closeModal={() => setIsEditModelClicked(false)}
      refreshTable={getAllUsersData}
      />

      <table className='table table-hover text-center container mt-4'>
        <thead>
          <tr>
            <th colSpan={2}>Actions</th>
            <th>SL NO</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Provider</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {fetchedData && fetchedData.length > 0 ? (
            fetchedData.map((item, index)=>(
              <tr key={item.id || index}>
                <td onClick={()=>handleEditClick(item.id)} style={{cursor: "pointer"}} className='text-primary'>Edit</td>
                <td onClick={()=>handleDeleteClick(item.id)} style={{cursor: "pointer"}} className='text-danger'>Delete</td>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{item.provider || '-'}</td>
                <td>{item.password || '-'}</td>
              </tr>
            ))
          ):(
            <tr>
              <td colSpan={10} style={{textAlign: 'center'}}>No Data Found!</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default AdminDashboard
