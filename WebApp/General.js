import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function General({setGeneralDetails}) {


  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setGeneralDetails(prevState => ({
        ...prevState,
        [name] : value
    }))
}

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Enter general details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
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
              onChange={handleInputChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="age"
            name="age"
            label="Age"
            helperText="In Months"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="breed"
            name="breed"
            label="Breed"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="color"
            name="color"
            label="Colour"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}