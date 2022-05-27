//employee.test.js

//import { configure, shallow, mount } from 'enzyme';

import React from 'react';
import EmployeesPage from '../../pages/employees-page/employees-page';

import { render, screen } from '@testing-library/react';


describe('<EmployeesPage/>', () =>{
    test('should render an employee input tag', async () => {
        const { getByTestId } = await render(<EmployeesPage/>);
        const text = getByTestId('newEmployee');
        expect(text).toBeDefined();
    });
}

)

/*
it('should render a submit button', () => {
    const wrapper = shallow(<EmployeesPage />);
    expect(wrapper.find('Button[name="submitNew"]').exists()).toBe(true);
});
it('the default value for both fields should be empty', () => {
    const wrapper = shallow(<EmployeesPage />);
    expect(wrapper.find('TextField[name="newEmployee').prop('value')).toBe('');
});
*/