import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import indexApis from '../../api/index';
import apis from '../../api/augmentedCisoApi';

const Evaluation = () => {
  const [score, setScore] = useState('');
  const [measures, setMeasures] = useState([]);
  const [isResult, setIsResult] = useState(false);

  const assessRisk = async () => {
    try {
      let response = await indexApis.assess();
      if (response.data.success) {
        while (response.data.data.score < 70) {
          response = await indexApis.assess();
          setScore(response.data.data.score);
          setMeasures(response.data.measures);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const displayMeasure = () => {
    setIsResult(true);
  };

  useEffect(() => {
    assessRisk();
  }, []);

  return (
    <Grid
      sx={{ maxWidth: '800px', margin: 'auto', paddingTop: '4rem' }}
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        variant="h3"
        color="secondary"
        gutterBottom
        component="div"
        sx={{ textAlign: 'center' }}
      >
        Best practices
      </Typography>
      <Typography variant="body2" display="block">
        Take the right measurements, MinRisk makes it easy with our evaluation
        programme
      </Typography>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: 'rgb(44, 82, 99,.5)',
          borderRadius: '50%',
          height: '8rem',
          width: '8rem',
          color: 'white',
          marginTop: '2rem'
        }}
      >
        <Typography variant="caption" display="block">
          Score
        </Typography>
        <Typography variant="h4" display="block" s>
          {score}
        </Typography>
      </Grid>
      <Button
        variant="contained"
        onClick={displayMeasure}
        sx={{ width: '10rem', margin: '2rem' }}
      >
        See measures
      </Button>
      {isResult && (
        <TableContainer>
          <Table
            sx={{ minWidth: 650, margin: '2rem' }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Measure</TableCell>
                <TableCell align="center">Cost k&euro;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {measures.map((row) => (
                <TableRow
                  key={row.identifier}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Grid>
  );
};

export default Evaluation;
