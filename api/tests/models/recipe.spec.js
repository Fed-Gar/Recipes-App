const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model testing', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if id is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid id')))
          .catch(() => done());
      });
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if summary is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('should work when its a valid name, summary and id', () => {
        Recipe.create({ 
            id: '8f89eb4c-5ce2-43a5-87f6-04e3df0f9dd4', 
            name: 'Milanesa a la napolitana', 
            summary: 'Milanesa con tomate y queso' 
          });
      });
    });
  });
});