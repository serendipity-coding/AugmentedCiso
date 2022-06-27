import getAuth from '../utils/getAuth.js';
import getMeasures from '../utils/getMeasures.js';
import play from '../utils/play.js';
import lodash from 'lodash';

const shuffleMeasures = (measures) => {
  let selectedMeasures = measures.sort(() => 0.5 - Math.random()).slice(0, 3);
  let totalCost = lodash.sum(selectedMeasures.map((elt) => elt.cost));
  return totalCost;
};

const predictMeasures = async (req, res) => {
  const token = req.params.token;

  try {
    // const token = await getAuth();
    const measures = await getMeasures(token);
    //   randomly select 3 measure and play, send combination if score is heigher than 60
    const shuffleMeasures = (measures) => {
      let selectedMeasures = measures
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      let totalCost = lodash.sum(selectedMeasures.map((elt) => elt.cost));
      while (totalCost > 100) {
        selectedMeasures = measures.sort(() => 0.5 - Math.random()).slice(0, 3);
        totalCost = lodash.sum(selectedMeasures.map((elt) => elt.cost));
      }
      return selectedMeasures;
    };

    // play
    const measuresToSend = shuffleMeasures(measures);
    const payload = {
      measures: measuresToSend.map((measure) => measure.identifier)
    };

    const response = await play(token, payload);
    res
      .status(200)
      .json({ success: true, data: response, measures: measuresToSend });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
};

export default {
  predictMeasures
};
