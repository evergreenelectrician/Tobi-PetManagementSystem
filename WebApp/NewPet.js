import * as React from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase-config'
import { ref, child, push, update } from "firebase/database";import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import General from '../components/NewPet/General';
import Vax from '../components/NewPet/Vax';
import Food from '../components/NewPet/Food';
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom';


const steps = ['General', 'Vaccination Details', 'Food Details'];

function getStepContent(step,setGeneralDetails,vaxValues,setVaxValues,setFoodDetails) {
  switch (step) {
    case 0:
      return <General setGeneralDetails={setGeneralDetails}/>;
    case 1:
      return <Vax vaxValues={vaxValues} setVaxValues={setVaxValues}/>;
    case 2:
      return <Food setFoodDetails={setFoodDetails}/>;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function NewPet() {

  const { user } = UserAuth();
  const navigate = useNavigate();

  const initialObj = {
    general: {
      name: "",
      gender: "",
      age: "",
      breed: "",
      color: "",
    },
    vax: [{
      name: "",
    isComplete: false,
    date: new Date()
    }],
    food: {
      name: "",
      quantity: "",
      stock: "",
      feed_times: []
    }
  }
  const [activeStep, setActiveStep] = React.useState(0);
  const[petDetails,setPetDetails] = React.useState(initialObj);
  const [generalDetails, setGeneralDetails] = React.useState(initialObj.general);
  const [vaxValues,setVaxValues] = React.useState(initialObj.vax);
  const [foodDetails,setFoodDetails] = React.useState(initialObj.food);
  const [loading, setLoading] = React.useState(false);


  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    setLoading(true);
    const newPetKey = push(child(ref(db), 'users'  + user.uid)).key;

    const updates = {};
    updates['/users/' + user.uid + '/' + newPetKey] = petDetails;

    update(ref(db), updates)
    .then(() => {
        alert("New Pet Registered");
        setLoading(false);
        navigate('/dashboard');
        
      })
      .catch((error) => {
        alert(error);
      });
    
};
  React.useEffect(() =>{
    /* console.log(generalDetails);
    console.log(vaxValues); */
    setPetDetails(prevState => ({
      ...prevState,
      general: generalDetails,
      vax: vaxValues,
      food: foodDetails
    }))

    console.log(petDetails)
  },[generalDetails,vaxValues,foodDetails]);

  



  return (
    loading ? <Loading />
    :
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Pet Details
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep,setGeneralDetails,vaxValues,setVaxValues,setFoodDetails)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}