import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import apis from '../../api/augmentedCisoApi';

const Results = ({ results }) => {
  const [score, setScore] = useState('');
  const [risks, setRisks] = useState([]);
  const [riskWithName, setRiskWithName] = useState([]);

  useEffect(() => {
    if (results) {
      setScore(results.score);
    } else {
      setRisks([]);
      setScore('');
    }
  }, [results]);

  const fetchRisks = async () => {
    try {
      const response = await apis.getRisks();
      setRisks(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    let arr = risks.map((item, i) => Object.assign({}, item, results.risks[i]));
    setRiskWithName(arr);
  }, [risks, results]);

  useEffect(() => {
    fetchRisks();
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ marginTop: '2rem', marginBottom: '3rem' }}
    >
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
          color: 'white'
        }}
      >
        <Typography variant="caption" display="block">
          Score
        </Typography>
        <Typography variant="h4" display="block" s>
          {score}
        </Typography>
      </Grid>

      {riskWithName.length > 0 && (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Risk</TableCell>
                <TableCell align="center">Severity</TableCell>
                <TableCell align="right">Coverage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {riskWithName.map((row) => (
                <TableRow
                  key={row.identifier}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.severity}</TableCell>
                  <TableCell align="right">{row.coverage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Grid>
  );
};

export default Results;
