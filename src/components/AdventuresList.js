/* eslint-disable no-underscore-dangle */
import React from 'react';
import { PropTypes } from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Adventure from './Adventure';

// import '../styles/style.css';

function AdventuresList({ adventures, updateLiked }) {
  return (
    <Grid container spacing={3}>
      <div className="list">
        {
          adventures.map((adv) => (
            <Grid item xs={3} key={adv._id}>
              {' '}
              <Adventure adventure={adv} updateLiked={updateLiked} />
              {' '}
              {/* <AdventureClass adventure={adv} updateLiked={updateLiked} liked={liked} /> */}
            </Grid>
          ))
        }
      </div>
    </Grid>
  );
}

AdventuresList.propTypes = {
  updateLiked: PropTypes.func.isRequired,
  adventures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AdventuresList;
