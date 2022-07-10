import React,{useState} from 'react'
import { db } from '../firebase-config'
import { ref, child, get,push, update } from "firebase/database";
import '../styles/dashboard.css'




function VaccSched({user}) {
  const [vax,setVax] = useState([]);

  const dbRef = ref(db);
get(child(dbRef, `users/${user.uid}/-N3IUUx7J7exU7FuBjkr/vax`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    setVax(snapshot.val())
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


  return (
    <div className='foodStock'>
      Vaccinations Pending
      <br />
      <br />
      <table>
      <tr>
        <th>Name</th>
        <th>Due Date</th>
      </tr>
      {vax.map(v => {

        let date = Date.parse(v.date);
        let displayDate = new Date(date);
        return(
          <tr>
            <td>{v.name}</td>
            <td>{displayDate.toDateString()}</td>
          </tr>
        )
      })}
      </table>
    </div>
  )
}

export default VaccSched