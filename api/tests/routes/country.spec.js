/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  id: '8f89eb4c-5ce2-43a5-87f6-04e3df0f9dd4',
  name: 'Milanesa a la napolitana',
  summary: 'Milanesa con tomate y queso',
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
  .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
    it('should be type json', () => {
      agent.get('/recipes').expect('Content-Type', /json/);
    });
  });
  describe('GET /recipes/idReceta', () => {
    it('should get 200 when the page exists', () =>
      agent.get('/recipes/8f89eb4c-5ce2-43a5-87f6-04e3df0f9dd4').expect(200)
    );
    it('should be type json', () => {
      agent.get('/recipes/8f89eb4c-5ce2-43a5-87f6-04e3df0f9dd4').expect('Content-Type', /json/);
    });
  });
});