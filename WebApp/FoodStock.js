import React, {useState} from 'react'
import { db } from '../firebase-config'
import { ref, child, get,push, update } from "firebase/database";
import '../styles/dashboard.css'

function FoodStock({user}) {

  const [food,setFood] = useState([]);

  const dbRef = ref(db);
get(child(dbRef, `users/${user.uid}/-N3HCClRPMZHsGUW2rHB/food`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    setFood(snapshot.val())
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

  return (
    <div className='foodStock'>
      <h3>FoodStock</h3>
      <p>Name of food:  {food.name}</p> 
      <p>Quantity to be fed:  {food.quantity} grams</p>
      <p>Stock: {food.stock} grams</p>
    </div>
  )
}

export default FoodStock