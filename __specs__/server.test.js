/* eslint-disable no-undef */
/**
 * @jest-environment node
 */
import 'regenerator-runtime/runtime';

const supertest = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = require('../server/index');

beforeEach((done) => {
  mongoose.connect('mongodb://localhost/recommended',
    {
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true,
    }, () => done());
});

afterAll((done) => {
  mongoose.connection.close(() => done());
});

test('GET /api/recommended', async (done) => {
  await supertest(app).get('/api/recommended')
    .then((response) => {
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(typeof response.body[0].name).toBe('string');
      expect(typeof response.body[0].reviews).toBe('number');
      expect(response.body[0].liked).toBe(false);
    })
    .catch((err) => err);

  done();
});

test('GET /api/recommended/hello/:num', async (done) => {
  await supertest(app).get('/api/recommended/hello/2')
    .then((response) => {
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(1);
      expect(typeof response.body[0].subcategory).toBe('Outdoor Adventures');
      expect(typeof response.body[0].reviews).toBe('number');
      expect(response.body[0].liked).toBe(false);
    })
    .catch((err) => err);

  done();
});

test('GET /api/recommended/:id', async (done) => {
  let id = '60087a64e722d554ee6aa016';

  await supertest(app).get(`/api/recommended/${id}`)
    .then((response) => {
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body[1]).toBe(undefined);
      expect(response.body[0].name).toBe('Akeem Mountains');
      expect(response.body[0].liked).toBe(false);
    })
    .catch((err) => err);

  id = 'testing123456';
  await supertest(app).get(`/api/recommended/${id}`)
    .then((response) => {
      expect(response.status).toBe(400);
    })
    .catch((err) => err);
  done();
});

test('PUT /api/recommended/:id', async (done) => {
  const id = '60087a64e722d554ee6aa021';
  const currentLiked = { liked: false };

  await supertest(app).put(`/api/recommended/${id}`, currentLiked)
    .then((response) => {
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object');
      expect(response.body.liked).toBe(true);
    })
    .catch((err) => err);

  done();
});
