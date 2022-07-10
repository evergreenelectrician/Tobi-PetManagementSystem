import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Loading from '../components/Loading'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase-config'
import { ref, set } from "firebase/database";
import { useNavigate } from 'react-router-dom';




function NewUser() {

    const { user } = UserAuth();
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setUserDetails(prevState => ({
            ...prevState,
            [name] : value
        }))
    }

    const handleSubmit = () => {
        setLoading(true);
        setUserDetails(prevState => ({
            ...prevState,
            displayName: user.displayName,
            photo: user.photoURL,
            email: user.email
        }))
        console.log(userDetails);
        set(ref(db, 'users/' + user.uid), userDetails)
        .then(() => {
            alert("New User Registered");
            setLoading(false);
            navigate('/newpet');
            
          })
          .catch((error) => {
            alert(error);
          });
        
    };

    //console.log(user.metadata.creationTime === user.metadata.lastSignInTime ? 'newuser' : 'olduser');

    const theme = createTheme();

    console.log(userDetails);

  return (
    loading ? <Loading /> 
    :
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Enter your details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
                required
                onChange={handleInputChange}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </React.Fragment>
      <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Submit
                  </Button>
      </Paper>
    </Container>
  </ThemeProvider>
    
  ) 
}

export default NewUser