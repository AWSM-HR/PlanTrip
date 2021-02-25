/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import AdventuresList from './components/AdventuresList';

axios.defaults.headers.common['Accept-Encoding'] = 'gzip';
axios.defaults.headers.common['Accept-Encoding'] = 'compress';
axios.defaults.headers.common['Accept-Encoding'] = 'br';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adventures: [],
      liked: false,
    };
    this.updateLiked = this.updateLiked.bind(this);
    this.viewSwitcher = this.viewSwitcher.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/api/recommended/${this.props.match.params.location}`)
      .then((results) => {
        const topSix = results.data.slice(0, 6);
        this.setState({
          adventures: topSix.map(i => i.properties),
        });
      })
      .catch((err) => err);
  }

  updateLiked(elementId, liked) {
    return axios.put(`http://54.189.97.228:8080/api/recommended/${elementId}`, { liked });
  }

  viewSwitcher(event) {
    const str = event.target.id;

    if (str === '1') {
      this.componentDidMount();
    } else {
      axios.get(`http://localhost:3000/api/recommended/${this.props.match.params.location}`)
        .then((results) => {
          const topFour = results.data.slice(0, 6);
          while (topFour.length < 6) {
            topFour.push({
              name: 'Choose More Favorites', image: 'https://cache.desktopnexus.com/thumbseg/2569/2569756-bigthumbnail.jpg', reviews: 0, rating: 5, price: '$0', liked: false, timesBooked: 0, subcategory: 'Beautiful Thailand', overview: 'There is so much to explore',
            });
          }
          this.setState({
            adventures: topFour,
          });
        })
        .catch((err) => err);
    }
  }

  render() {
    const { adventures } = this.state;
    const style = {
      grids: {
        padding: '0px 0px',
        height: 'auto',
        position: 'relative',
        radius: '0px',
        border: '1px solid #e0e0e0',
        backgroundColor: 'white',
      },
      title: {
        fontWeight: '900',
        font: '14px "Trip Sans", Arial, sans-serif',

      },
      body: {
        fontWeight: '400',
        font: '12px ',
      },
      div: {
        margin: '0 auto',
        position: 'center',
      },
      container: {
        margin: '10px 110px',
      },
      paper: {
        padding: '20px',
        border: '0px white solid',
        outline: '0px',
        backgroundColor: 'white',
      },
      heading: {
        margin: '0 95px 20px',
        font: '26px "Trip Sans", Arial, sans-serif',
      },
    };
    return (
      <div className="main">
        {/* Heading */}
        <h2 style={style.heading}>Plan your visit</h2>

        {/* Recommended Tab */}
        <Grid style={style.container} container spacing={1}>
          <Grid item xs={2} style={style.grids}>
            <div style={style.paper}>
              <div style={style.title} onClick={this.viewSwitcher}><b id="1">Recommended</b></div>
              <div style={style.body}>Our most popular tours and activities</div>
            </div>
          </Grid>
          <Grid item xs={2} style={style.grids}>
            <div style={style.paper}>
              <div style={style.title} onClick={this.viewSwitcher}><b id="2">Outdoor Adventures</b></div>
              <div style={style.body}>The best times with the best sunshine</div>
            </div>
          </Grid>
          <Grid item xs={2} style={style.grids}>
            <div style={style.paper}>
              <div style={style.title} onClick={this.viewSwitcher}><b id="3">Tours & Sightseeing</b></div>
              <div style={style.body}>Browse our largest collection of experiences</div>
            </div>
          </Grid>
          <Grid item xs={2} style={style.grids}>
            <div style={style.paper}>
              <div style={style.title} onClick={this.viewSwitcher}><b id="4">Private & Custom Tours</b></div>
              <div style={style.body}>Flexible itineraries and personal experiences</div>
            </div>
          </Grid>
          <Grid item xs={2} style={style.grids}>
            <div style={style.paper}>
              <div style={style.title} onClick={this.viewSwitcher}><b id="5">Browse Your Favorites</b></div>
              <div style={style.body}>There are more adventures on the horizon</div>
            </div>
          </Grid>
        </Grid>

        {/* List of Adventures */}
        <div style={style.div}>
          <AdventuresList
            adventures={adventures}
            updateLiked={this.updateLiked}
            liked={this.state.liked}
          />
        </div>
      </div>
    );
  }
}

export default App;
