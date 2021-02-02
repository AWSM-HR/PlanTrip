/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import AdventuresList from '../src/components/AdventuresList';

describe('AdventureList component functions as expected', () => {
  const adventures = [{
    _id: '60087a64e722d554ee6aa021',
    name: 'Batz Place',
    image: 'https://tutorial90005123.s3.us-east-2.amazonaws.com/thailandPics/tripadvisor_thailand_27.jpg',
    reviews: 45257,
    rating: 2.98,
    price: '$348.00',
    liked: true,
    timesBooked: 27009,
    __v: 0,
  }];
  const updateLiked = () => 'hello';
  const wrap = shallow(<AdventuresList
    adventures={adventures}
    updateLiked={updateLiked}
  />);

  it('renders without crashing', (done) => {
    expect(wrap.exists()).toBeTruthy();
    done();
  });
});
