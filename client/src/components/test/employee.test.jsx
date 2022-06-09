//employee.test.js

//import { configure, shallow, mount } from 'enzyme';

import React from 'react';
import EmployeesPage from '../../pages/employees-page/employees-page';

import { render, screen, fireEvent } from '@testing-library/react';


describe('<EmployeesPage/>', () =>{
    test('should render an employee input tag', async () => {
        const { getByTestId } = await render(<EmployeesPage/>);
        const text = getByTestId('newEmployee');
        expect(text).toBeDefined();
    });
    test('Look for tu button', async () => {
        const { getByTestId } = await render(<EmployeesPage/>);
        const butt = getByTestId('newEmp');
        fireEvent(
          butt,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
        expect(butt).toBeDefined();
        //expect(toggleSideBar).toHaveBeenCalled();
      });

      test('Put input', async () => {
        const { getByTestId } = await render(<EmployeesPage/>);
        const toggle = screen.getByTestId('newEmp');
        fireEvent(
          toggle,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
    
        // Get Input & write
        const input = screen.getByPlaceholderText('addemp');
        fireEvent.change(input, { target: { value: 'a' } });
    
        // Search
        const searchButton = screen.getAllByTestId('newEmp')[0];
        fireEvent(
          searchButton,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
        expect(input).toBeDefined();
        //expect(changeUrl).toHaveBeenCalled();
      });
    
});