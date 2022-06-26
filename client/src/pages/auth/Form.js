import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apis from '../../api/augmentedCisoApi';

const Form = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  //   Register a new player
  const registerPlayer = async () => {
    setError(false);
    const payload = {
      email,
      name
    };
    try {
      setError(false);
      const response = await apis.register(payload);
      let token = response.data.token;
      sessionStorage.setItem('minRisk-token', token);
      if (token) navigate(`/dashboard`);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  return (
    <Grid>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        // autoComplete="email"
        autoFocus
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="name"
        label="Name"
        type="text"
        id="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && (
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          color="secondary"
        >
          Something went wrong please try again
        </Typography>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={registerPlayer}
      >
        Sign In
      </Button>
    </Grid>
  );
};

export default Form;
