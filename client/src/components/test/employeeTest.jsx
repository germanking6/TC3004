//employee.test.js

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import React from 'react';
import { employee } from '../pages/employees-page/employees-page';

configure({ adapter: new Adapter() }); //enzyme - react 16 hooks support

it('should render an employee input tag', () => {
    const wrapper = shallow(<EmployeesPage />);
    expect(wrapper.find('TextField[name="newEmployee"]').exists()).toBe(true);
});

it('should render a submit button', () => {
    const wrapper = shallow(<EmployeesPage />);
    expect(wrapper.find('Button[name="submitNew"]').exists()).toBe(true);
});
it('the default value for both fields should be empty', () => {
    const wrapper = shallow(<EmployeesPage />);
    expect(wrapper.find('TextField[name="newEmployee').prop('value')).toBe('');
});
