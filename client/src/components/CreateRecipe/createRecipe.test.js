import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import CreateRecipe from './CreateRecipe.jsx';

describe('<CreateRecipe /> Mounted', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<CreateRecipe />);
  });
  it('El form debe tener un label que diga: "Título:"', () => {
      const { container } = render(<CreateRecipe />)
      const element = container.querySelectorAll('label')[0]
      expect(element.innerHTML).toBe('Título:');
  });

  it('El form debe tener un label que diga: "Resumen:"', () => {
    const { container } = render(<CreateRecipe />)
    const element = container.querySelectorAll('label')[1]
    expect(element.innerHTML).toBe('Resumen:');
  });

  it('El form debe tener un input con name "name" y type "text"', () => {
    const { container } = render(<CreateRecipe />)
    const element = container.querySelectorAll('input')[0]
    expect(element.type).toBe('text');
    expect(element.name).toBe('name');
  });

  it('El input de name tiene que tener la clase danger si tiene un error',  () => {
      wrapper.find('input[name="name"]').simulate('change', {target: {name: 'name', value: 'Pi'}});
      const ele = wrapper.find('input[name="name"]');
      expect(ele.hasClass('danger')).toBeTruthy();
   });
  it('El input de name NO tiene que tener la clase danger si no tiene errores',  () => {
      wrapper.find('input[name="username"]').simulate('change', {target: {name: 'name', value: 'Pizza'}});
      const ele = wrapper.find('input[name="name"]');

      expect(ele.hasClass('danger')).toBeFalsy();
    });
});