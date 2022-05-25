//employee.test.js
import Input from "react-validation/build/input";
//import { configure, shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import React from 'react';
import { EmployeesPage } from '../pages/employees-page/employees-page';
require("@babel/core").transformSync("code", {
    presets: ["@babel/preset-react"],
});
Enzyme.configure({ adapter: new Adapter() }); 

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
