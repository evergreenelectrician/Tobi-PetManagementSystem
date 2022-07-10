import React from 'react'
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase-config'
import { doc, updateDoc } from "firebase/firestore"; 
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';



function NewPetForm() {

    const { user } = UserAuth();
    const navigate = useNavigate();

    console.log(user.uid);

    const userDocRef = doc(db, "users", user.uid);

    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        await updateDoc(userDocRef, {
            pet : data
        });
        alert("New Pet Registered");
        navigate('/dashboard');
    };


  return (
    <>
    <div>NewPetForm</div>
    <form onSubmit={handleSubmit(onSubmit)}>
                <label>Name:</label><br />
                <input {...register("name")} /><br />
                <label>Age:</label><br />
                <input type="number" {...register("age")} /><br />
                <label>Gender:</label><br />
                <select {...register("gender")}>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                </select><br />
                <label>Colour:</label><br />
                <input {...register("colour")} /><br />
                <p>Vaccination Details:</p><br />
                  <label>Vaccination Name:</label><br />
                  <input {...register("vacc_name")} /><br />
                  <label>Next due date:</label><br />
                  <input type='date' {...register("vacc_due")} /><br />
                <input type="submit" />
                <input type="reset" />
    </form>
    </>
  )
}

export default NewPetForm