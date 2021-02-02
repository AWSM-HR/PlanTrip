/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import React from 'react';
// import { shallow, mount } from 'enzyme';
import { createMount } from '@material-ui/core/test-utils';
import Adventure from '../src/components/Adventure';

describe('Adventure component functions as expected', () => {
  const mount = createMount();

  const adv = {
    _id: '60087a64e722d554ee6aa021',
    name: 'Batz Place',
    image: 'https://tutorial90005123.s3.us-east-2.amazonaws.com/thailandPics/tripadvisor_thailand_27.jpg',
    reviews: 45257,
    rating: 2.98,
    price: '$348.00',
    liked: true,
    timesBooked: 27009,
    __v: 0,
  };
  const updateLiked = jest.fn();

  const wrap = mount(<Adventure adventure={adv} updateLiked={updateLiked} />);

  it('renders without crashing', (done) => {
    expect(wrap.exists()).toBeTruthy();
    done();
  });

  it('contains the assigned props', (done) => {
    expect(wrap.getElement().props.adventure._id).toEqual('60087a64e722d554ee6aa021');
    done();
  });

  // it('should contain and invoke onClick handler', (done) => {
  //   const firstFab = wrap.find('.test562').first();
  //   expect(typeof firstFab.getElement().props.onClick).toEqual('function');

  //   firstFab.getElement().props.onClick();
  //   firstFab.invoke('onClick')();
  //   firstFab.invoke('onClick')();
  //   expect(handleClick.calls.length).toBe(2);
  //   done();
  // });
});
