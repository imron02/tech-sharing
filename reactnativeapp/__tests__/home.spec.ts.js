import React from 'react';
import HomeScreen from '../src/screens/home';
import {fireEvent, render} from '@testing-library/react-native';
import AuthContext from '../src/context/auth-context';

const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
};
const mockSignOut = jest.fn();
const setup = () =>
  render(
    <AuthContext.Provider
      value={{
        userToken: 'secret',
        signIn: jest.fn(),
        signOut: mockSignOut,
        isLoading: false,
      }}>
      <HomeScreen navigation={mockNavigation} />
    </AuthContext.Provider>,
  );

it('render without error', () => {
  const {getByText} = setup();
  expect(getByText(/go to profile/i)).toBeTruthy();
  expect(getByText(/sign out/i)).toBeTruthy();
});
it('should go to profile page', () => {
  const {getByText} = setup();
  const button = getByText(/go to profile/i);

  fireEvent.press(button);
  expect(mockNavigate).toHaveBeenCalledWith('Profile');
});
it('sign out', () => {
  const {getByText} = setup();
  const button = getByText(/sign out/i);

  fireEvent.press(button);
  expect(mockSignOut).toHaveBeenCalledTimes(1);
});
