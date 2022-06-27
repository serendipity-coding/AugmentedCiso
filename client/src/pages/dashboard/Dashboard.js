import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apis from '../../api/augmentedCisoApi';
import Intro from './Intro';
import Results from './Results';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '100%'
    }
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [measures, setMeasures] = useState([]);
  const [selectedMeasures, setSelectedMeasures] = useState([]);
  const [selectedError, setSelectedError] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState(null);
  const [excessBudget, setExcessBudget] = useState(false); //player is limited to (100k€) per assessement

  //   handle multi select change
  const handleChange = (event) => {
    setAssessmentResults(null);
    setExcessBudget(false);
    const {
      target: { value }
    } = event;
    setSelectedMeasures(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  // player can only choose up to 3 measure
  useEffect(() => {
    if (selectedMeasures.length > 0 && selectedMeasures.length < 4) {
      setSelectedError(false);
    } else if (selectedMeasures.length >= 4 || selectedMeasures.length === 0) {
      setSelectedError(true);
    }
  }, [selectedMeasures]);

  //   Get all measures
  const fetchMeasures = async () => {
    try {
      const response = await apis.getMeasures();
      setMeasures(response.data);
    } catch (error) {
      setMeasures([]);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMeasures();
  }, []);

  //   asses risk
  const assesRisk = async () => {
    setSelectedError(true);
    const payload = {
      measures: selectedMeasures.map((item) => item.identifier)
    };
    try {
      setExcessBudget(false);
      const response = await apis.assessRisk(payload);
      setAssessmentResults(response.data);
    } catch (error) {
      setSelectedMeasures([]);
      setExcessBudget(true);
      console.log(error);
    }
  };
  return (
    <Grid sx={{ maxWidth: '800px', margin: 'auto', paddingTop: '4rem' }}>
      {!measures.length > 0 ? (
        <CircularProgress />
      ) : (
        <Grid>
          <Intro />

          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ marginTop: '2rem' }}
          >
            <FormControl sx={{ width: '100%' }}>
              <InputLabel>Measures</InputLabel>
              <Select
                id="measures-multiple-checkbox"
                multiple
                value={selectedMeasures}
                onChange={handleChange}
                input={<OutlinedInput label="Measures" />}
                renderValue={(selected) =>
                  selected.map((item) => item.name).join(', ')
                }
                MenuProps={MenuProps}
              >
                {measures.map((measure) => (
                  <MenuItem
                    key={measure.identifier}
                    value={measure}
                    fullWidth={true}
                  >
                    <Checkbox
                      checked={selectedMeasures.indexOf(measure) > -1}
                    />
                    <ListItemText primary={measure.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ marginTop: '2rem' }}
            >
              <Button
                disabled={selectedError}
                variant="contained"
                onClick={assesRisk}
                sx={{ width: '8rem' }}
              >
                Assess
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ color: 'white', width: '8rem', marginLeft: '2rem' }}
                onClick={() => {
                  navigate(`/evaluation`);
                }}
              >
                Get evalutaion
              </Button>
            </Grid>
          </Grid>
          {excessBudget && (
            <Grid sx={{ marginTop: '2rem' }}>
              <Alert severity="error">
                You exceed your risk assessment budget, please try again
              </Alert>
            </Grid>
          )}
          {assessmentResults && <Results results={assessmentResults} />}
        </Grid>
      )}
    </Grid>
  );
};

export default Dashboard;
