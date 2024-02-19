import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Box, Card, CardMedia, Grid, useMediaQuery, useTheme} from '@mui/material';
import { Typography } from '@material-ui/core';

interface Kupci {
  ku_sifra:number, 
  ku_naziv:string, 
  ku_grad:string, 
  ku_ziro:number, 
  ku_tel:number, 
  ku_pib:number, 
  ku_mat:number, 
  ku_sd:number
}

function Kupci() {
  const [data, setData] = useState<Kupci[]>();

  useEffect(() => {
    axios.get('http://localhost:2000/data')
      .then(res => setData(res.data))
      .catch(err => console.error('Error:', err));
  }, []);

  console.log("front data is >> ", data)
  return (
    <Grid>
        {data?.map((customer, index) => (
        <div key={index}>
          <Typography>{customer.ku_naziv}</Typography>
          <Typography>{customer.ku_grad}</Typography>
          {/* Render other properties as needed */}
        </div>
      ))}
    </Grid>
    // <div className="App">
    //   <header className="App-header">
    //     <h1>{JSON.stringify(data)}</h1> {/* Display data as JSON */}
    //   </header>
    // </div>
  );
}

export default Kupci;