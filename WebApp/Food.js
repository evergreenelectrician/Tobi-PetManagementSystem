import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TimePicker from 'react-time-picker';



export default function Food({setFoodDetails}) {

  const [times,setTimes] = React.useState(['10:00']);

  const addTime = () => {
    setTimes(oldArr => ([...oldArr,'']))
  }

  const removeTime = (index) => {
    let newArr = [...times];
  newArr.splice(index,1);
  setTimes(newArr)
  }

  const handleTimesChange = (index, e) => {

    let newArr = [...times];
    newArr[index] = e;
    setTimes(newArr);
    setFoodDetails(prevState => ({
      ...prevState,
      feed_times : newArr
  }))
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFoodDetails(prevState => ({
        ...prevState,
        [name] : value
    }))
}

  console.log(times);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Food Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Name of food"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="quantity"
            name="quantity"
            label="Quantity to be fed"
            helperText="In grams"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="stock"
            name="stock"
            label="Current Stock"
            helperText="In grams"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h8" gutterBottom>
            Enter feeding timings: 
          </Typography>
        </Grid>
        {times.map((time,index) => {
          return(
            <>
            <Grid item xs={8}>
              <TimePicker onChange={e => handleTimesChange(index, e)} value={time} />
            </Grid>
            <Grid item xs={4}>
            <Fab size="small" color="error" aria-label="add" onClick={() => removeTime(index)}>
              <RemoveIcon />
            </Fab>
          </Grid>
            </>
          )
        })}
        <Grid item xs={12}>
        <Fab size="small" color="primary" aria-label="add" onClick={addTime}>
          <AddIcon />
        </Fab>
      </Grid>
        
      </Grid>
    </React.Fragment>
  );
}