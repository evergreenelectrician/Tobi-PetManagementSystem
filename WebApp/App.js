import './App.css';
import { useState } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NewPet from './pages/NewPet'
import Dashboard from './pages/Dashboard';
import Protected from './utils/Protected';
import SignIn from './pages/SignIn';
import { AuthContextProvider } from './context/AuthContext'
import { Route, Routes } from 'react-router-dom';
import NewUser from './pages/NewUser';
import NewPetForm from './pages/NewPetForm';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Loading from './components/Loading';
import Copyright from './components/Copyright';
import { getToken } from 'firebase/messaging';

function App() {

  const [isTokenFound, setTokenFound] = useState(false);
  getToken(setTokenFound);

  return (
    <div className="App">
      <AuthContextProvider>
        <ResponsiveAppBar />  
        {/* <Loading /> */}
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route
            path='/dashboard'
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path='/newuser'
            element={
              <Protected>
                <NewUser/>
              </Protected>
            }
          />
          <Route
            path='/newpet'
            element={
              <Protected>
                {/* <NewPetForm/> */}
                <NewPet />
              </Protected>
            }
          />
        </Routes>
        <Copyright />
{/*         <VideoFeed />
        <Chatbot /> */}
      </AuthContextProvider>
    </div>
  );
}

export default App;
