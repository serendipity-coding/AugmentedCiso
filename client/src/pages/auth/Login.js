import { Avatar, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Form from './Form';
// assets
import logo from '../../assets/risk.png';

const Login = () => {
  return (
    <Grid sx={{ maxWidth: '600px', margin: 'auto', paddingTop: '2rem' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          variant="square"
          src={logo}
          sx={{ width: '10rem', height: '10rem' }}
        />
        <Typography variant="h2" color="primary" gutterBottom component="div">
          Welcome to MinRisk
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          please login to start assessing your risk
        </Typography>
      </Grid>
      <Form />
    </Grid>
  );
};

export default Login;
