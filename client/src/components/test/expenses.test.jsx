import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpensesPage from '../../pages/expenses-page/Expenses-Page';

describe('<ExpensesPage/>', () =>{
    test('should find an input', async () => {
        const { getByTestId } = await render(<ExpensesPage/>);
        const input = getByTestId('newEmail');
        expect(input).toBeDefined();
    });
    
    
});