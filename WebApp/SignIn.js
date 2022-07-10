import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase-config'
import { ref, child, get } from "firebase/database";
import '../styles/signInPage.css'


function SignIn() {

    const { googleSignIn, user } = UserAuth();
    
const navigate = useNavigate();

const getIfNewUser = async () => {

    const dbRef = ref(db);
    get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        navigate('/dashboard');
      } else {
        console.log("No data available");
        navigate('/newuser');
      }
    }).catch((error) => {
      console.error(error);
    });
}

    const handleGoogleSignIn = async () => {
        try {
          await googleSignIn();

        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        if (user != null) {
            console.log(user.uid);
            getIfNewUser();
                //navigate('/newuser');
                
                
        }
 
    }, [user]);

    return (
            <GoogleButton type='light'  label='Sign I'/* className='googleButton' */ onClick={handleGoogleSignIn} />

    )
}

export default SignIn