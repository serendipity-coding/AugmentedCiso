import { Avatar, Button, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Nav = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ padding: '1rem 4rem' }}
    >
      <Grid>
        <Avatar
          src={logo}
          variant="square"
          sx={{ width: '150px', height: '30px', cursor: 'pointer' }}
          onClick={() => {
            navigate(`/`);
          }}
        />
      </Grid>
      <Grid>
        <Button variant="contained" sx={{ backgroundColor: '#FA7041' }}>
          About us
        </Button>
      </Grid>
    </Grid>
  );
};

export default Nav;
