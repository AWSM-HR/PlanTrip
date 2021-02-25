/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import $ from 'jquery';
import { PropTypes } from 'prop-types';
// import '../styles/style.css';
import Card from '@material-ui/core/Card';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Fab from '@material-ui/core/Fab';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import axios from 'axios';

class Adventure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.props.adventure.liked,
      modal: false,
    };
    this.useStyles = {
      modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: '2px, solid #000',
        boxShadow: '5px 10px #888888',
        padding: '10px 10px 20px 10px',
      },
      modalImage: {
        marginTop: '30px',
        border: '2px solid gray',
        width: '400px',
        height: '300px',
        position: 'relative',
      },
      modaldiv: {
        position: 'absolute',
        marginBottom: '10px',
        right: '5%',
        fontSize: '24px',
      },
      overview: {
        float: 'right',
        width: '40%',
        marginTop: '40px',
      },
      overviewHeading: {
        fontWeight: '700',
      },
      media: {
        width: '279.5px',
        height: '186.31px',
      },
      bubbles: {
        color: '#00AA6C',
        backgroundColor: 'white',
      },
      card: {
        padding: '20px 10px 32px',
        height: '372px',
      },
      reviews: {
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingBottom: '0px',
        paddingTop: '0px',
        verticalAlign: 'top',
        textAlign: 'center',
      },
      content: {
        paddingLeft: '0px',
        paddingTop: '0px',
      },
      title: {
        marginBottom: '0px',
        marginLeft: '5px',
      },
      button: {
        marginLeft: 'auto',
        marginRight: '0',
        backgroundColor: 'black',
        color: 'white',
        textTransform: 'none',
        borderRadius: '25px',
        right: '0',
      },
      wrapper: {
        position: 'relative',
      },
      infoi: {
        position: 'absolute',
        top: '2px',
        right: '2px',
        color: 'white',
        background: 'transparent',
        height: '24px',
        width: '24px',
      },
      info: {
        position: 'absolute',
        top: '2px',
        right: '2px',
        color: '#FF6666',
        background: 'transparent',
        height: '24px',
        width: '24px',
      },
      popular: {
        background: '#E0E0E0',
        fontWeight: 'bold',
        radius: '50%',
      },
      bottom: {
        padding: '8px 12px 12px',
      },
    };
    this.numberWithCommas = this.numberWithCommas.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  handleClick() {
    const { updateLiked } = this.props;
    const { adventure } = this.props;
    const { _id } = adventure;
    const { liked } = this.state;
    updateLiked(_id, liked)
      .then((response) => {
        this.setState({
          liked: response.data.liked,
        });
      });
  }

  openModal(e) {
    e.preventDefault();
    const current = this.state.modal;
    this.setState({
      modal: !current,
    });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {
    const { adventure } = this.props;
    const { _id } = adventure;
    const { name } = adventure;
    const { image } = adventure;
    let reviews = adventure.weightedCount.low;
    const { rating } = adventure;
    const { timesBooked } = adventure;
    const { price } = adventure;
    const { subcategory } = adventure;
    const { overview } = adventure;
    const { liked } = adventure;

    if (reviews >= 1000) {
      reviews = this.numberWithCommas(reviews);
    }

    const ratingElements = (
      <div>
        <Rating
          name="customized-icons"
          value={rating}
          precision={0.5}
          size="small"
          style={this.useStyles.bubbles}
          icon={<FiberManualRecordIcon style={this.useStyles.bubblesOutline} />}
          getLabelText={(value) => `${value} reviews \n`}
        />
        <Typography
          style={this.useStyles.reviews}
          variant="body2"
          color="textSecondary"
          component="span"
        >
          {`${reviews} reviews`}
        </Typography>
      </div>
    );

    return (
      <div style={this.useStyles.card}>
        <Card>
          <div style={this.useStyles.wrapper}>
            <img style={this.useStyles.media} src={image} alt={name} />
            <Fab
              id={_id}
              className="test562"
              style={
                this.state.liked ? this.useStyles.info : this.useStyles.infoi
              }
              variant="extended"
              size="small"
              aria-label="like"
              onClick={this.handleClick}
            >
              <FavoriteIcon />
            </Fab>
          </div>
          <div style={this.useStyles.bottom}>
            <h3 style={this.useStyles.title}>{name}</h3>
            <CardContent style={this.useStyles.content}>
              {ratingElements}
            </CardContent>
            <CardActions>
              <span>
                <b>{price}</b>
                {' per adult'}
              </span>
              <Button size="small" style={this.useStyles.button} variant="contained" onClick={this.openModal}>
                More info
              </Button>
              <Modal open={this.state.modal} onClose={this.openModal} style={this.useStyles.modal}>
                <p>{subcategory}</p>
                <h2>{name}</h2>
                {ratingElements}
                <span style={this.useStyles.modaldiv}><b>{price}</b></span>

                <img style={this.useStyles.modalImage} src={image} alt={name} />
                <span style={this.useStyles.overview}>
                  <div style={this.useStyles.overviewHeading}>Overview</div>
                  <div>{overview}</div>
                </span>
              </Modal>

            </CardActions>
            {
              timesBooked > 50000 ? <p style={this.useStyles.popular}>{`Popular: Booked by ${this.numberWithCommas(timesBooked)} travelers!`}</p> : <p><br /></p>
            }
          </div>
        </Card>
      </div>
    );
  }
}

Adventure.propTypes = {
  updateLiked: PropTypes.func.isRequired,
  // updateLiked: PropTypes.shape({
  //   updateLiked: PropTypes.func,
  // }).isRequired,
  adventure: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    reviews: PropTypes.number,
    rating: PropTypes.number,
    price: PropTypes.string,
    liked: PropTypes.bool,
    timesBooked: PropTypes.number,
    subcategory: PropTypes.string,
    overview: PropTypes.string,
  }).isRequired,
};

export default Adventure;
