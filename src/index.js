/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import reactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import './styles/style.css';
import App from './App';

reactDOM.render(
  <HashRouter>
    <Route path="/recommended/:location" component={App} />
  </HashRouter>, document.getElementById('root'));
