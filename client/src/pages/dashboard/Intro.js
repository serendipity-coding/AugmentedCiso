import { Typography } from '@mui/material';
import React from 'react';

const Intro = () => {
  return (
    <>
      <Typography
        variant="h3"
        color="secondary"
        gutterBottom
        component="div"
        sx={{ textAlign: 'center' }}
      >
        Risk assessment
      </Typography>
      <Typography variant="body2" display="block">
        In order to evaluate the risks that your company might encounter, please
        select up to 3 measures
      </Typography>
    </>
  );
};

export default Intro;
