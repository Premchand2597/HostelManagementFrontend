import React, { useEffect, useState } from "react";
import type { RegisterType } from "../Models/Register";
import { fetchDataById, updateEditedData } from "../Services/AuthService";
import toast from "react-hot-toast";

interface propsType{
    clickedId: number;
    modelStatus: boolean;
    closeModal: () => void;
    refreshTable: () => void;
}

const UpdateRegisterForm = ({clickedId, modelStatus, closeModal, refreshTable}: propsType) => {

    const [fetchedData, setFetchedData] = useState<RegisterType>({
        id: 0,
        name: '',
        email: '',
        role: '',
        provider: '',
        password: ''
    });

    useEffect(()=>{
        if (!modelStatus || !clickedId) return;

        setFetchedData({
            id: 0,
            name: '',
            email: '',
            role: '',
            provider: '',
            password: ''
        });

        const loadData = async () =>{
            try {
                const result = await fetchDataById(clickedId);
                setFetchedData(result);
            } catch (error: any) {
                const errorMessage =
                error?.response?.data?.error ||   // backend message
                error?.message ||                 // axios/network error
                "Failed to fetch admin data!";    // fallback
                toast.error(errorMessage);
                console.error(error);
            }    
        };
        loadData();
    }, [clickedId, modelStatus]);

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>){
        setFetchedData({
            ...fetchedData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try {
            const result = await updateEditedData(fetchedData, clickedId);
            if(result){
                toast.success("Updated successfully!");
            }
            refreshTable();
            closeModal();
        } catch (error: any) {
            const errorMessage =
            error?.response?.data?.error ||   // backend message
            error?.message ||                 // axios/network error
            "Failed to fetch admin data!";    // fallback
            toast.error(errorMessage);
            console.error(error);
        }    
    }
    
  return (
    <>
    <div style={{display: modelStatus ? "block" : "none", width: "100%", height: "100%", zIndex: "2", position: "fixed", top: "0", background: "rgba(0, 0, 0, 0.9)"}}>
        <form onSubmit={handleFormSubmit} className="container p-2" style={{width: "40%", margin: "3% auto", background: "#ccc"}}>
            <input type="text" onChange={handleOnChange} name="name" value={fetchedData?.name} placeholder="Enter name" className="form-control mb-2"/>
            <input type="email" onChange={handleOnChange} name="email" value={fetchedData?.email} placeholder="Enter email" className="form-control mb-2"/>
            <input type="text" onChange={handleOnChange} name="role" value={fetchedData?.role} placeholder="Enter role" className="form-control mb-2"/>
            <input type="text" onChange={handleOnChange} name="provider" value={fetchedData?.provider} placeholder="Enter provider" className="form-control mb-2"/>
            <input type="password" onChange={handleOnChange} name="password" value={fetchedData?.password} placeholder="Enter password" className="form-control mb-2"/>

            <button type="submit" className="btn btn-success mx-2">Update</button>
            <button type="button" onClick={closeModal} className="btn btn-dark">Close</button>
        </form> 
    </div>
    </>
  )
}

export default UpdateRegisterForm
