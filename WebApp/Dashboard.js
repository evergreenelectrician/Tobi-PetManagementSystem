import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chatbot from '../components/Chatbot';
import VideoFeed from '../components/VideoFeed';
import FoodStock from '../components/FoodStock'
import VaccSched from '../components/VaccSched'
import DogDetails from '../components/DogDetails'
import Notifications from '../components/Notifications';
import { UserAuth } from '../context/AuthContext';
  import { db } from '../firebase-config'
  import { getDatabase, ref, child, get,push, update } from "firebase/database";
import '../styles/dashboard.css'
import Distress from '../components/Distress';
import { Button } from '@mui/material';


function Dashboard() {

    const { user } = UserAuth();

    const [userData, setUserData] = useState({});


/* async function getResponse() {
  try {
    const response = await axios.get('http://192.168.43.59:8000/response');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

getResponse(); */

const stopFeed = () => {
  const db = getDatabase();

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/FoodModule/Motor'] = 0;

  return update(ref(db), updates);
  }


  const feedNnow = () => {
    const db = getDatabase();

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/FoodModule/Motor'] = 1;

  update(ref(db), updates)

  setTimeout(stopFeed, 15000);
  }

  
    useEffect(() => {

    const getDetails =  () => { 
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setUserData(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

    }

    getDetails();


    }, [user])
    
    


  return (
        <div className='dashboard-wrapper'>
            <p>Welcome {userData.firstName} {userData.lastName}</p>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} >
              <Grid container spacing={3} item xs={12} md={6} style={{float: 'left'}}>
              <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 140,
                    }}
                  >
                    <Distress />
                  </Paper>
                </Grid>
                
                

                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Button color="primary" variant="contained" onClick={feedNnow}>Feed Now</Button>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 140,
                    }}
                  >
                    <VaccSched user={user}/>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container spacing={1} item xs={12} md={5} style={{float: 'right'}}>
              <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <VideoFeed />
                  </Paper>
              </Grid>
              <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <FoodStock user={user} />
                  </Paper>
              </Grid>
              </Grid>
            </Container>
            <Chatbot />
            {/* <Notifications /> */}
        </div>
  )
}

export default Dashboard