import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { Kupac } from '../Interfejsi/Kupac';

const KupacUnos = () => {
    const [formData, setFormData] = useState<Kupac>(
      {ku_sifra: 0,
        ku_naziv: '',
        ku_grad: '',
        ku_adresa:'',
        ku_ziro: 0,
        ku_tel: 0,
        ku_pib: 0,
        ku_mat: 0,
        ku_sd: 0}
    );

      
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postData(formData);
      console.log('Data inserted successfully');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const postData = async (data) => {
    try {
      const response = await fetch('http://localhost:2000/insertData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tableName: 'kupci', data })
      });
      if (!response.ok) {
        throw new Error('Failed to insert data');
      }
    } catch (error) {
      throw new Error('Failed to insert data: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Sifra"
            name="ku_sifra"
            // value={formData?.ku_sifra}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Naziv"
            name="ku_naziv"
            // value={formData?.ku_naziv}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Adresa"
            name="ku_tel"
            // value={formData?.ku_tel}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Grad"
            name="ku_grad"
            // value={formData?.ku_grad}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Broj telefona"
            name="ku_tel"
            // value={formData?.ku_tel}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Ziro racun"
            name="ku_ziro"
            // value={formData?.ku_ziro}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Pib"
            name="ku_pib"
            // value={formData?.ku_pib}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Maticni broj"
            name="ku_mat"
            // value={formData?.ku_mat}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="SD"
            name="ku_sd"
            // value={formData?.ku_sd}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </form>
  );
};

export default KupacUnos;




