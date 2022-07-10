import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DatePicker from 'react-date-picker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Vax({vaxValues,setVaxValues}) {


  const handleInputChange = (index,e) => {

    let newArr = [...vaxValues]

    if(e.target !== undefined){
      const { name, value } = e.target;
      if(name === 'isCompleted'){
        newArr[index].isComplete = !newArr[index].isComplete
        setVaxValues(newArr);
      }else{
        newArr[index].name = value
        setVaxValues(newArr);
      }
    }else{
      newArr[index].date = e
      setVaxValues(newArr);
    }
}

const addVax = () => {
  const newObj = {
    name: "",
    isComplete: false,
    date: new Date()
  }

  setVaxValues(prevState => ([...prevState, newObj]))
}

const removeVax = (index) => {
  let newArr = [...vaxValues];
  newArr.splice(index,1);
  setVaxValues(newArr)
}

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Enter Vaccination Details
      </Typography>
      <Grid container spacing={3}>
      {vaxValues.map((vax,index) => {
        return(
          <>
          <Grid item xs={3}>
            <Fab size="small" color="error" aria-label="add" onClick={() => removeVax(index)}>
              <RemoveIcon />
            </Fab>
          </Grid>
          <Grid item xs={9}>
          <TextField
            required
            id="vaxName"
            name='vaxName'
            label="Name of Vaccine"
            fullWidth
            variant="standard"
            onChange={e => handleInputChange(index, e)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel control={<Checkbox />} label="Completed" name='isCompleted' onChange={e => handleInputChange(index, e)}/>
        </Grid>
        {!vaxValues[index].isComplete ? 
        <Grid item xs={12} md={6}>
          <Typography variant="h8" gutterBottom>
            Due date : 
          </Typography>
          <br />
          <DatePicker minDate={new Date()} name="date" required onChange={e => handleInputChange(index, e)} value={vaxValues[index].date}/>
        </Grid>
        :
        <Grid item xs={12} md={6}>
          <Typography variant="h8" gutterBottom>
            Completion date : 
          </Typography>
          <DatePicker maxDate={new Date()} name="date" required onChange={e => handleInputChange(index, e)} value={vaxValues[index].date}/>
        </Grid>
      }
        </>
        )
      })}
      <Grid item xs={12}>
        <Fab color="primary" aria-label="add" onClick={addVax}>
          <AddIcon />
        </Fab>
      </Grid>
      
       {/*  <a href="http://192.168.43.162/Feed">Feed</a> */}
      </Grid>
    </React.Fragment>
  );
}