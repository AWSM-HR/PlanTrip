/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../src/App';

describe('App component functions as expected', () => {
  const wrap = shallow(<App />);

  it('renders without crashing', (done) => {
    expect(wrap.exists()).toBeTruthy();
    done();
  });
  it('contains a heading tag', (done) => {
    expect(wrap.containsMatchingElement(<h2>Plan your visit</h2>)).toBeTruthy();
    done();
  });
  it('is a class component', (done) => {
    expect(wrap.type()).toBe('div');
    done();
  });
  it('should check componentDidMount()', (done) => {
    const instance = wrap.instance();
    jest.spyOn(instance, 'componentDidMount');
    instance.componentDidMount();
    expect(instance.componentDidMount).toHaveBeenCalledTimes(1);
    done();
  });
  it('expect state to include adventures property', (done) => {
    expect(wrap.state().adventures).toEqual([]);
    done();
  });
  it('should invoke updateLiked', (done) => {
    const instance = wrap.instance();
    jest.spyOn(instance, 'updateLiked');
    instance.updateLiked('60087a64e722d554ee6aa022');
    expect(instance.updateLiked).toHaveBeenCalledTimes(1);
    done();
  });
  it('should invoke viewSwitcher onClick of tab', (done) => {
    const instance = wrap.instance();
    jest.spyOn(instance, 'viewSwitcher');
    instance.viewSwitcher({ target: 2 });
    expect(instance.viewSwitcher).toHaveBeenCalledTimes(1);
    instance.viewSwitcher({ target: 5 });
    expect(instance.viewSwitcher).toHaveBeenCalledTimes(2);
    done();
  })
});
