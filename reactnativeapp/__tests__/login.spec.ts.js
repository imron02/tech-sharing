import React from 'react';
import LoginScreen from '../src/screens/login';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import AuthContext from '../src/context/auth-context';

it('render without error', () => {
  const {getByText, getByPlaceholderText} = render(<LoginScreen />);

  expect(getByText('Login')).toBeTruthy();
  expect(getByPlaceholderText('Input email')).toBeTruthy();
  expect(getByPlaceholderText('Input password')).toBeTruthy();
});

describe('form validation', () => {
  it('show email error message', async () => {
    const {getByPlaceholderText, getByText} = render(<LoginScreen />);
    const email = getByPlaceholderText('Input email');
    fireEvent(email, 'blur', {
      persist: jest.fn(),
      target: {name: '', value: 'user.email'},
    });

    await waitFor(() => {
      expect(getByText('Email is required')).toBeTruthy();
      fireEvent.changeText(email, 'user.email');
    });

    expect(getByText('Invalid email address')).toBeTruthy();
  });
  it('show password error message', async () => {
    const {getByPlaceholderText, getByText} = render(<LoginScreen />);
    const password = getByPlaceholderText('Input password');
    fireEvent(password, 'blur', {
      persist: jest.fn(),
      target: {name: '', value: 'user.password'},
    });

    await waitFor(() => {
      expect(getByText('Password is required')).toBeTruthy();
      fireEvent.changeText(password, 'pass');
    });

    expect(getByText('Password minimum length is 5')).toBeTruthy();
  });
});

describe('login flow', () => {
  it('should enable button', async () => {
    const {getByPlaceholderText, getByTestId} = render(<LoginScreen />);
    const email = getByPlaceholderText('Input email');
    const password = getByPlaceholderText('Input password');

    fireEvent.changeText(email, 'test@mail.com');
    fireEvent.changeText(password, 'password');

    await waitFor(() => {
      expect(getByTestId('btn-login')).not.toBeDisabled();
    });
  });
  it('should success login', async () => {
    const mockSignIn = jest.fn();
    const {getByPlaceholderText, getByTestId} = render(
      <AuthContext.Provider
        value={{
          userToken: 'secret',
          signIn: mockSignIn,
          signOut: jest.fn(),
          isLoading: false,
        }}>
        <LoginScreen />
      </AuthContext.Provider>,
    );
    const email = getByPlaceholderText('Input email');
    const password = getByPlaceholderText('Input password');
    const buttonLogin = getByTestId('btn-login');

    fireEvent.changeText(email, 'test@mail.com');
    fireEvent.changeText(password, 'password');
    fireEvent.press(buttonLogin);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalled();
    });
  });
});
