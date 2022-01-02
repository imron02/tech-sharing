import React from 'react';
import Input from './Input';
import {fireEvent, render, screen} from '@testing-library/react';

const mockSetInputWords = jest.fn();
const mockSetSuccess = jest.fn();
const setup = () => render(
  <Input
    secretWord="secret"
    inputWords={[]}
    setInputWords={mockSetInputWords}
    setSuccess={mockSetSuccess} />
)
describe('render without error (success is false)', () => {
  test('Input renders without error', () => {
    setup();
    const inputComponent = screen.getByTestId('component-input');
    expect(inputComponent).toBeInTheDocument();
  });
  test('input box displays', () => {
    setup();
    const inputComponent = screen.getByPlaceholderText(/Masukkan kata/i);
    expect(inputComponent).toBeInTheDocument();
  });
  test('submit button displays', () => {
    setup();
    const submitButton = screen.getByRole('button', {name: 'Submit'});
    expect(submitButton).toBeInTheDocument();
  });
});

describe('state controlled input field', () => {
  test('state updates with value of input box upon change', async () => {
    setup();

    const inputComponent = screen.getByPlaceholderText(/Masukkan kata/i);
    fireEvent.change(inputComponent, {target: {value: 'secret'}});

    expect(inputComponent).toHaveValue('secret');
  });

  test('field is cleared upon submit button click', () => {
    setup();
    const inputComponent = screen.getByPlaceholderText(/Masukkan kata/i);
    fireEvent.change(inputComponent, {target: {value: 'secret'}});

    const submitButton = screen.getByRole('button', {name: 'Submit'});
    fireEvent.click(submitButton);
    expect(mockSetInputWords).toHaveBeenCalled();
  });

  test('setSuccess called upon submit button click', () => {
    setup();
    const inputComponent = screen.getByPlaceholderText(/Masukkan kata/i);
    fireEvent.change(inputComponent, {target: {value: 'secret'}});

    const submitButton = screen.getByRole('button', {name: 'Submit'});
    fireEvent.click(submitButton);
    expect(mockSetSuccess).toHaveBeenCalled();
  });
})
