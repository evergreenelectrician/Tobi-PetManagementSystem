import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config'
import { ref, onValue} from "firebase/database";
import { green, red, yellow } from '@mui/material/colors';
import '../styles/dashboard.css'





function Distress() {

    const [distress,setDistress] = useState("0");
    const [motion,setMotion] = useState("00:00:00")

    const getDistressColor = () => {
        switch (distress) {
            case 0:
              return '#388e3c';
            case 1:
              return '#f57f17';
            case 2:
              return '#b71c1c';
          }
    }


    useEffect(() => {

        const starCountRef = ref(db, 'CameraModule');
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        setDistress(data.MandD)
        setMotion(data.LastMotion)
        });


      }, []);

  return (
    <div className='distressDetails'>
        <div className='distressBox'>
            <h6>Distress Status</h6>
            <div className='distress' style={{backgroundColor: getDistressColor()}}></div>
        </div>
        <div className="lastMotion">
        <h6>Last Motion Detected</h6>
            <h3>{motion}</h3>
        </div>
    </div>
  )
}

export default Distress