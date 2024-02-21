import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Box, Card, CardMedia, Grid, useMediaQuery, useTheme} from '@mui/material';
import { Typography } from '@material-ui/core';
import {Kupac} from '../Interfejsi/Kupac'

function Kupci() {
  const [data, setData] = useState<Kupac[]>();

  // useEffect(() => {
  //   axios.get('http://localhost:2000/data')
  //     .then(res => setData(res.data))
  //     .catch(err => console.error('Error:', err));
  // }, []);

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
  );
}

export default Kupci;